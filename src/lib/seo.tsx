import type { Metadata } from "next";
import {
  AUTHOR_NAME,
  CONTACT_EMAIL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  YEAR,
} from "@/lib/site";

export const HOME_TITLE =
  "Simulador de Patente ARBA 2026 | Calculadora de Patente PBA";

export const HOME_DESCRIPTION =
  "Simulá la patente ARBA 2026 con la escala progresiva de la Provincia de Buenos Aires. Calculadora gratuita e independiente de Patente PBA para autos y motos.";

export const DEFAULT_DESCRIPTION =
  "Calculá una estimación del impuesto automotor en la Provincia de Buenos Aires con la escala 2026. Sitio independiente, no oficial de ARBA.";

type PageSeoInput = {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  type = "website",
  publishedTime,
  modifiedTime,
  keywords,
  noIndex = false,
}: PageSeoInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogTitle = absoluteTitle ? title : `${title} | ${SITE_NAME}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    authors: [{ name: AUTHOR_NAME }],
    creator: AUTHOR_NAME,
    publisher: SITE_NAME,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "es_AR",
      type,
      ...(type === "article"
        ? {
            publishedTime,
            modifiedTime,
            authors: [AUTHOR_NAME],
          }
        : {}),
    },
    twitter: {
      card: "summary",
      title: ogTitle,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: [
      "Patente ARBA",
      "Simulador de Patente ARBA",
      "Calculadora de Patente PBA",
    ],
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "es-AR",
    publisher: {
      "@type": "Person",
      name: AUTHOR_NAME,
      email: CONTACT_EMAIL,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    description: SITE_TAGLINE,
    founder: {
      "@type": "Person",
      name: AUTHOR_NAME,
      email: CONTACT_EMAIL,
    },
  };
}

export function webApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: HOME_TITLE,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "ARS",
    },
    provider: {
      "@type": "Person",
      name: AUTHOR_NAME,
      email: CONTACT_EMAIL,
    },
    url: SITE_URL,
    description: HOME_DESCRIPTION,
    inLanguage: "es-AR",
    isAccessibleForFree: true,
    keywords: [
      "patente ARBA",
      "calculadora patente",
      "impuesto automotor",
      "Patente PBA",
      String(YEAR),
    ],
  };
}

export function faqPageJsonLd(
  items: { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
