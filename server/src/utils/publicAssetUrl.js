const LOCAL_ASSET_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0']);

const getRequestOrigin = (req) => {
  const forwardedProto = req.get('x-forwarded-proto');
  const protocol = forwardedProto ? forwardedProto.split(',')[0].trim() : req.protocol;
  return `${protocol}://${req.get('host')}`;
};

const toPublicAssetUrl = (req, value) => {
  if (!value) {
    return value;
  }

  const origin = getRequestOrigin(req);

  if (/^https?:\/\//i.test(value)) {
    try {
      const parsed = new URL(value);
      if (LOCAL_ASSET_HOSTS.has(parsed.hostname) && parsed.pathname.startsWith('/uploads/')) {
        return `${origin}${parsed.pathname}${parsed.search}`;
      }

      return value;
    } catch (_error) {
      return value;
    }
  }

  if (value.startsWith('/uploads/')) {
    return `${origin}${value}`;
  }

  if (value.startsWith('uploads/')) {
    return `${origin}/${value}`;
  }

  return value;
};

module.exports = {
  getRequestOrigin,
  toPublicAssetUrl,
};
