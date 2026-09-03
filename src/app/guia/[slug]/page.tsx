import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LinkedText } from "@/components/LinkedText";
import { RelatedGuides } from "@/components/RelatedGuides";
import { getGuide, guides } from "@/lib/guides";
import { AUTHOR_NAME, SITE_NAME, SITE_URL } from "@/lib/site";
import {
  JsonLd,
  breadcrumbJsonLd,
  buildPageMetadata,
} from "@/lib/seo";

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const guide = getGuide(slug);
    if (!guide) return {};
    return buildPageMetadata({
      title: guide.seoTitle,
      description: guide.description,
      path: `/guia/${guide.slug}/`,
      type: "article",
      publishedTime: `${guide.updated}T12:00:00-03:00`,
      modifiedTime: `${guide.updated}T12:00:00-03:00`,
      keywords: [
        guide.seoTitle,
        "patente ARBA",
        "impuesto automotor",
        "Buenos Aires",
        SITE_NAME,
      ],
    });
  });
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();
  const usedLinks = new Set<string>();
  const pageUrl = `${SITE_URL}/guia/${guide.slug}/`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.updated,
    dateModified: guide.updated,
    inLanguage: "es-AR",
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    url: pageUrl,
  };

  return (
    <article className="mx-auto max-w-[68ch] px-4 py-14">
      <JsonLd data={articleLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Guías", path: "/guia/" },
          { name: guide.title, path: `/guia/${guide.slug}/` },
        ])}
      />
      <p className="text-sm text-muted">
        <Link href="/guia/" className="text-accent hover:text-accent-hover">
          Guías
        </Link>
      </p>
      <h1 className="title title-page mt-3">{guide.title}</h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">
        <LinkedText text={guide.intro} currentSlug={guide.slug} used={usedLinks} />
      </p>

      {guide.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="heading">{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-4 leading-relaxed text-ink-soft">
              <LinkedText text={paragraph} currentSlug={guide.slug} used={usedLinks} />
            </p>
          ))}
        </section>
      ))}

      <section className="mt-10">
        <h2 className="heading">Fuentes</h2>
        <ul className="mt-4 grid gap-2 text-sm">
          {guide.sources.map((source) => (
            <li key={source.href}>
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent-hover"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-sm">
        <Link href="/" className="font-semibold text-accent hover:text-accent-hover">
          Volver a la calculadora
        </Link>
      </p>

      <RelatedGuides slug={guide.slug} />
    </article>
  );
}
