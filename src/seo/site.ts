export const SITE_NAME = "Mudiame Lush";
export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/+$/, "") || "https://mudiamelush.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/vite.svg`;

export const buildAbsoluteUrl = (path = "/") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
};
