import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { buildAbsoluteUrl, DEFAULT_OG_IMAGE, SITE_NAME } from "../seo/site";

type SeoProps = {
  title: string;
  description: string;
  image?: string;
  type?: string;
  keywords?: string[];
  canonicalPath?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const ensureMetaTag = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const ensureLinkTag = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector(selector) as HTMLLinkElement | null;

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const Seo = ({
  title,
  description,
  image,
  type = "website",
  keywords,
  canonicalPath,
  noindex = false,
  jsonLd,
}: SeoProps) => {
  const location = useLocation();

  useEffect(() => {
    const pageTitle = `${title} | ${SITE_NAME}`;
    const path = canonicalPath || `${location.pathname}${location.search}`;
    const canonicalUrl = buildAbsoluteUrl(path);
    const imageUrl = image ? buildAbsoluteUrl(image) : DEFAULT_OG_IMAGE;

    document.title = pageTitle;

    ensureMetaTag('meta[name="description"]', {
      name: "description",
      content: description,
    });
    ensureMetaTag('meta[name="robots"]', {
      name: "robots",
      content: noindex ? "noindex, nofollow" : "index, follow",
    });
    ensureMetaTag('meta[property="og:title"]', {
      property: "og:title",
      content: pageTitle,
    });
    ensureMetaTag('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    ensureMetaTag('meta[property="og:type"]', {
      property: "og:type",
      content: type,
    });
    ensureMetaTag('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    ensureMetaTag('meta[property="og:image"]', {
      property: "og:image",
      content: imageUrl,
    });
    ensureMetaTag('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    ensureMetaTag('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: pageTitle,
    });
    ensureMetaTag('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    ensureMetaTag('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: imageUrl,
    });

    if (keywords && keywords.length > 0) {
      ensureMetaTag('meta[name="keywords"]', {
        name: "keywords",
        content: keywords.join(", "),
      });
    }

    ensureLinkTag('link[rel="canonical"]', {
      rel: "canonical",
      href: canonicalUrl,
    });

    const existingScript = document.head.querySelector(
      'script[data-seo-json-ld="true"]',
    );
    if (existingScript) {
      existingScript.remove();
    }

    if (jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoJsonLd = "true";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [canonicalPath, description, image, jsonLd, keywords, location.pathname, location.search, noindex, title, type]);

  return null;
};

export default Seo;
