CREATE TABLE IF NOT EXISTS booking_catalog_products (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  category VARCHAR(120) NOT NULL,
  name VARCHAR(180) NOT NULL UNIQUE,
  amount_ngn DECIMAL(10,2) NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  sort_order INT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_booking_catalog_products_category (category),
  KEY idx_booking_catalog_products_active_sort (is_active, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO booking_catalog_products (category, name, amount_ngn, is_active, sort_order)
VALUES
  ('Nails', 'Gel Nail Polish', 7000, 1, 1),
  ('Lips', 'Lip Gloss', 4000, 1, 2),
  ('Eyes', 'Eyeshadow Palette', 12000, 1, 3),
  ('Lips', 'Lip Pencil', 3000, 1, 4),
  ('Self-Care', 'Face Mask', 5000, 1, 5),
  ('Self-Care', 'Foot Mask', 5000, 1, 6),
  ('Self-Care', 'Hair Oil', 6500, 1, 7),
  ('Self-Care', 'Body Oil', 6500, 1, 8)
ON DUPLICATE KEY UPDATE
  category = VALUES(category),
  amount_ngn = VALUES(amount_ngn),
  is_active = VALUES(is_active),
  sort_order = VALUES(sort_order);
