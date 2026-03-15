const { dbPool } = require('../../config/db.config');

const mapPostRow = (row) => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  excerpt: row.excerpt,
  content: row.content,
  featured_image_url: row.featured_image_url,
  published_at: row.published_at,
  status: row.status,
  author: {
    id: row.author_id,
    display_name: row.author_name,
    slug: row.author_slug,
    avatar_url: row.author_avatar_url,
  },
  metrics: {
    comment_count: Number(row.comment_count || 0),
    view_count: Number(row.view_count || 0),
    share_count: Number(row.share_count || 0),
  },
  categories: row.categories
    ? row.categories
        .split(',')
        .filter(Boolean)
        .map((pair) => {
          const [id, name, slug] = pair.split('|');
          return {
            id: Number(id),
            name,
            slug,
          };
        })
    : [],
  created_at: row.created_at,
  updated_at: row.updated_at,
});

const slugify = (text) =>
  String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const ensureUniqueSlug = async (baseSlug, excludePostId = null, connection = null) => {
  const conn = connection || dbPool;
  const root = baseSlug || `post-${Date.now()}`;
  let candidate = root;
  let suffix = 1;

  while (true) {
    const params = [candidate];
    let query = 'SELECT id FROM classic_blog_posts WHERE slug = ?';
    if (excludePostId) {
      query += ' AND id <> ?';
      params.push(excludePostId);
    }
    query += ' LIMIT 1';

    const [rows] = await conn.execute(query, params);
    if (!rows.length) {
      return candidate;
    }

    suffix += 1;
    candidate = `${root}-${suffix}`;
  }
};

const ensureAuthor = async (authorInput, connection) => {
  const conn = connection || dbPool;
  const name = String(authorInput?.display_name || 'Mudiame Team').trim();
  const slugBase = slugify(authorInput?.slug || name || 'author');

  const [bySlug] = await conn.execute(
    'SELECT id, display_name, slug FROM classic_blog_authors WHERE slug = ? LIMIT 1',
    [slugBase]
  );

  if (bySlug.length) {
    return bySlug[0];
  }

  const [insertResult] = await conn.execute(
    `INSERT INTO classic_blog_authors (display_name, slug, avatar_url, bio)
     VALUES (?, ?, ?, ?)`,
    [name, slugBase, authorInput?.avatar_url || null, authorInput?.bio || null]
  );

  return {
    id: insertResult.insertId,
    display_name: name,
    slug: slugBase,
  };
};

const ensureCategories = async (categories = [], connection) => {
  const conn = connection || dbPool;
  const categoryIds = [];

  for (const category of categories) {
    if (category?.id) {
      const [byId] = await conn.execute(
        'SELECT id FROM classic_blog_categories WHERE id = ? LIMIT 1',
        [Number(category.id)]
      );
      if (byId.length) {
        categoryIds.push(byId[0].id);
      }
      continue;
    }

    const name = String(category?.name || '').trim();
    if (!name) {
      continue;
    }

    const slug = slugify(category.slug || name);
    const [existing] = await conn.execute(
      'SELECT id FROM classic_blog_categories WHERE slug = ? LIMIT 1',
      [slug]
    );

    if (existing.length) {
      categoryIds.push(existing[0].id);
      continue;
    }

    const [insertResult] = await conn.execute(
      `INSERT INTO classic_blog_categories (name, slug)
       VALUES (?, ?)`,
      [name, slug]
    );
    categoryIds.push(insertResult.insertId);
  }

  return [...new Set(categoryIds)];
};

const createPost = async ({
  title,
  slug,
  excerpt,
  content,
  featured_image_url,
  published_at,
  status,
  author,
  categories,
}) => {
  const connection = await dbPool.getConnection();
  try {
    await connection.beginTransaction();

    const ensuredAuthor = await ensureAuthor(author, connection);
    const uniqueSlug = await ensureUniqueSlug(slugify(slug || title), null, connection);

    const [insertResult] = await connection.execute(
      `INSERT INTO classic_blog_posts
      (author_id, title, slug, excerpt, content, featured_image_url, published_at, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ensuredAuthor.id,
        title,
        uniqueSlug,
        excerpt || null,
        content || null,
        featured_image_url || null,
        published_at || null,
        status || 'draft',
      ]
    );

    await connection.execute(
      `INSERT INTO classic_blog_post_metrics (post_id, comment_count, view_count, share_count)
       VALUES (?, 0, 0, 0)
       ON DUPLICATE KEY UPDATE post_id = VALUES(post_id)`,
      [insertResult.insertId]
    );

    const categoryIds = await ensureCategories(categories || [], connection);
    for (const categoryId of categoryIds) {
      await connection.execute(
        `INSERT INTO classic_blog_post_categories (post_id, category_id)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE created_at = created_at`,
        [insertResult.insertId, categoryId]
      );
    }

    await connection.commit();
    return insertResult.insertId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const updatePost = async (postId, payload) => {
  const connection = await dbPool.getConnection();
  try {
    await connection.beginTransaction();

    const [existingRows] = await connection.execute(
      'SELECT id FROM classic_blog_posts WHERE id = ? LIMIT 1',
      [postId]
    );
    if (!existingRows.length) {
      await connection.rollback();
      return false;
    }

    const {
      title,
      slug,
      excerpt,
      content,
      featured_image_url,
      published_at,
      status,
      author,
      categories,
    } = payload;

    let authorId = null;
    if (author) {
      const ensuredAuthor = await ensureAuthor(author, connection);
      authorId = ensuredAuthor.id;
    }

    let nextSlug = null;
    if (slug || title) {
      nextSlug = await ensureUniqueSlug(slugify(slug || title), postId, connection);
    }

    const fields = [];
    const values = [];

    if (title !== undefined) {
      fields.push('title = ?');
      values.push(title);
    }
    if (nextSlug !== null) {
      fields.push('slug = ?');
      values.push(nextSlug);
    }
    if (excerpt !== undefined) {
      fields.push('excerpt = ?');
      values.push(excerpt);
    }
    if (content !== undefined) {
      fields.push('content = ?');
      values.push(content);
    }
    if (featured_image_url !== undefined) {
      fields.push('featured_image_url = ?');
      values.push(featured_image_url);
    }
    if (published_at !== undefined) {
      fields.push('published_at = ?');
      values.push(published_at);
    }
    if (status !== undefined) {
      fields.push('status = ?');
      values.push(status);
    }
    if (authorId !== null) {
      fields.push('author_id = ?');
      values.push(authorId);
    }

    if (fields.length) {
      values.push(postId);
      await connection.execute(
        `UPDATE classic_blog_posts SET ${fields.join(', ')} WHERE id = ?`,
        values
      );
    }

    if (categories !== undefined) {
      await connection.execute(
        'DELETE FROM classic_blog_post_categories WHERE post_id = ?',
        [postId]
      );

      const categoryIds = await ensureCategories(categories || [], connection);
      for (const categoryId of categoryIds) {
        await connection.execute(
          `INSERT INTO classic_blog_post_categories (post_id, category_id)
           VALUES (?, ?)`,
          [postId, categoryId]
        );
      }
    }

    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const deletePost = async (postId) => {
  const [result] = await dbPool.execute('DELETE FROM classic_blog_posts WHERE id = ?', [postId]);
  return result.affectedRows > 0;
};

const listPosts = async ({ page = 1, pageSize = 12, status = 'published', includeDraft = false }) => {
  const limit = Math.max(1, Math.min(50, Number(pageSize) || 12));
  const offset = Math.max(0, (Number(page) - 1) * limit);

  const conditions = [];
  const params = [];

  if (!includeDraft) {
    conditions.push('p.status = ?');
    params.push(status || 'published');
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const [countRows] = await dbPool.query(
    `SELECT COUNT(*) AS total
     FROM classic_blog_posts p
     ${whereClause}`,
    params
  );

  const [rows] = await dbPool.query(
    `SELECT
      p.id,
      p.author_id,
      p.title,
      p.slug,
      p.excerpt,
      p.content,
      p.featured_image_url,
      p.published_at,
      p.status,
      p.created_at,
      p.updated_at,
      a.display_name AS author_name,
      a.slug AS author_slug,
      a.avatar_url AS author_avatar_url,
      m.comment_count,
      m.view_count,
      m.share_count,
      GROUP_CONCAT(DISTINCT CONCAT(c.id, '|', c.name, '|', c.slug) SEPARATOR ',') AS categories
     FROM classic_blog_posts p
     JOIN classic_blog_authors a ON a.id = p.author_id
     LEFT JOIN classic_blog_post_metrics m ON m.post_id = p.id
     LEFT JOIN classic_blog_post_categories pc ON pc.post_id = p.id
     LEFT JOIN classic_blog_categories c ON c.id = pc.category_id
     ${whereClause}
     GROUP BY p.id
     ORDER BY COALESCE(p.published_at, p.created_at) DESC
     LIMIT ${limit} OFFSET ${offset}`,
    params
  );

  return {
    items: rows.map(mapPostRow),
    page: Number(page),
    pageSize: limit,
    total: Number(countRows[0]?.total || 0),
  };
};

const getPostBySlug = async (slug) => {
  const [rows] = await dbPool.execute(
    `SELECT
      p.id,
      p.author_id,
      p.title,
      p.slug,
      p.excerpt,
      p.content,
      p.featured_image_url,
      p.published_at,
      p.status,
      p.created_at,
      p.updated_at,
      a.display_name AS author_name,
      a.slug AS author_slug,
      a.avatar_url AS author_avatar_url,
      m.comment_count,
      m.view_count,
      m.share_count,
      GROUP_CONCAT(DISTINCT CONCAT(c.id, '|', c.name, '|', c.slug) SEPARATOR ',') AS categories
     FROM classic_blog_posts p
     JOIN classic_blog_authors a ON a.id = p.author_id
     LEFT JOIN classic_blog_post_metrics m ON m.post_id = p.id
     LEFT JOIN classic_blog_post_categories pc ON pc.post_id = p.id
     LEFT JOIN classic_blog_categories c ON c.id = pc.category_id
     WHERE p.slug = ?
     GROUP BY p.id
     LIMIT 1`,
    [slug]
  );

  return rows.length ? mapPostRow(rows[0]) : null;
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  listPosts,
  getPostBySlug,
};
