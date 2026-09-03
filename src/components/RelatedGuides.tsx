import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { getRelatedGuides } from "@/lib/guides";

export function RelatedGuides({ slug }: { slug: string }) {
  const related = getRelatedGuides(slug);
  if (related.length === 0) return null;

  return (
    <nav aria-label="Artículos relacionados" className="mt-14">
      <h2 className="heading">
        Artículos relacionados
      </h2>
      <p className="mt-2 text-sm text-muted">
        Siguen el mismo tema de esta guía, para completar el trámite o el cálculo.
      </p>
      <ul className="mt-6 divide-y border-y border-line">
        {related.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/guia/${guide.slug}/`}
              className="group flex items-baseline justify-between gap-6 py-5"
            >
              <span>
                <span className="block font-medium text-foreground group-hover:text-accent">
                  {guide.title}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">
                  {guide.description}
                </span>
              </span>
              <ArrowRight
                size={16}
                className="shrink-0 text-muted group-hover:text-accent"
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
