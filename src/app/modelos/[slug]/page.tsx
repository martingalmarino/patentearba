import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Warning } from "@phosphor-icons/react/dist/ssr";
import { Calculator } from "@/components/Calculator";
import {
  JsonLd,
  breadcrumbJsonLd,
  buildPageMetadata,
} from "@/lib/seo";
import { SITE_NAME, SITE_URL, YEAR } from "@/lib/site";
import {
  formatPriceRange,
  formatRank,
  formatRegistrations,
  getAllVehicles,
  getRelatedVehicles,
  getVehicle,
  isPickup,
  vehicleDisplayName,
  vehiclesDataset,
} from "@/lib/vehicles";

export function generateStaticParams() {
  return getAllVehicles().map((vehicle) => ({ slug: vehicle.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const vehicle = getVehicle(slug);
    if (!vehicle) return {};
    return buildPageMetadata({
      title: vehicle.seo_title,
      description: vehicle.meta_description,
      path: `/modelos/${vehicle.slug}/`,
      absoluteTitle: true,
      type: "article",
      keywords: [
        vehicleDisplayName(vehicle),
        "patente ARBA",
        `patente ${vehicle.model}`,
        SITE_NAME,
      ],
    });
  });
}

type SpecKey =
  | "engine"
  | "displacement_cc"
  | "power_cv"
  | "torque_nm"
  | "fuel"
  | "transmission"
  | "traction"
  | "length_mm"
  | "trunk_l"
  | "cargo_capacity_kg"
  | "airbags";

const SPEC_ROWS: { key: SpecKey; label: string; suffix?: string }[] = [
  { key: "engine", label: "Motor" },
  { key: "displacement_cc", label: "Cilindrada", suffix: " cc" },
  { key: "power_cv", label: "Potencia", suffix: " CV" },
  { key: "torque_nm", label: "Torque", suffix: " Nm" },
  { key: "fuel", label: "Combustible" },
  { key: "transmission", label: "Transmisión" },
  { key: "traction", label: "Tracción" },
  { key: "length_mm", label: "Largo", suffix: " mm" },
  { key: "trunk_l", label: "Baúl", suffix: " L" },
  { key: "cargo_capacity_kg", label: "Carga", suffix: " kg" },
  { key: "airbags", label: "Airbags" },
];

function formatSpecValue(
  value: string | number | null,
  suffix?: string,
): string | null {
  if (value == null || value === "") return null;
  return `${value}${suffix ?? ""}`;
}

export default async function ModeloPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  if (!vehicle) notFound();

  const name = vehicleDisplayName(vehicle);
  const pageUrl = `${SITE_URL}/modelos/${vehicle.slug}/`;
  const related = getRelatedVehicles(vehicle.slug, 3);
  const pickup = isPickup(vehicle);

  const vehicleLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name,
    brand: {
      "@type": "Brand",
      name: vehicle.brand,
    },
    model: vehicle.model,
    vehicleConfiguration: vehicle.body_type,
    description: vehicle.short_description,
    url: pageUrl,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "ARS",
      lowPrice: vehicle.price_reference.from,
      highPrice: vehicle.price_reference.to,
      offerCount: 2,
      description: vehicle.price_reference.type,
    },
  };

  return (
    <article className="mx-auto max-w-[68ch] px-4 py-14">
      <JsonLd data={vehicleLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Modelos", path: "/modelos/" },
          { name: name, path: `/modelos/${vehicle.slug}/` },
        ])}
      />

      <p className="text-sm text-muted">
        <Link href="/modelos/" className="text-accent hover:text-accent-hover">
          Modelos
        </Link>
      </p>
      <h1 className="title title-page mt-3">
        <span className="block">{vehicle.brand}</span>
        <span className="title-accent">{vehicle.model}.</span>
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">
        {vehicle.short_description}
      </p>

      <dl className="mt-8 grid gap-4 border-y border-line py-6 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
            Ranking 2026 YTD
          </dt>
          <dd className="mt-1 font-semibold text-ink">
            {formatRank(vehicle.sales.rank_2026_ytd)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
            Patentamientos ene-ago 2026
          </dt>
          <dd className="mt-1 font-semibold text-ink">
            {formatRegistrations(vehicle.sales.registrations_2026_through_august)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
            Ranking 2025
          </dt>
          <dd className="mt-1 font-semibold text-ink">
            {formatRank(vehicle.sales.rank_2025)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-muted">
            Tipo / origen
          </dt>
          <dd className="mt-1 font-semibold text-ink">
            {vehicle.body_type} · {vehicle.origin}
          </dd>
        </div>
      </dl>

      <section className="mt-10">
        <h2 className="heading">Precio sugerido de lista</h2>
        <p className="mt-3 text-2xl font-semibold tracking-tight text-ink">
          {formatPriceRange(vehicle)}
        </p>
        <p className="mt-2 text-sm text-muted">
          Versión de entrada: {vehicle.price_reference.entry_version}. Fecha de
          referencia: {vehicle.price_reference.price_date}.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {vehiclesDataset.price_definition} Para estimar la patente necesitás la
          valuación fiscal, no este rango.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="heading">Ficha técnica</h2>
        <dl className="mt-4 divide-y border-y border-line">
          {SPEC_ROWS.map((row) => {
            const formatted = formatSpecValue(
              vehicle.technical_specs[row.key],
              row.suffix,
            );
            if (!formatted) return null;
            return (
              <div
                key={row.key}
                className="flex items-baseline justify-between gap-6 py-3 text-sm"
              >
                <dt className="text-muted">{row.label}</dt>
                <dd className="text-right font-medium text-ink">{formatted}</dd>
              </div>
            );
          })}
        </dl>
      </section>

      {pickup ? (
        <p className="mt-10 flex gap-2 rounded-[8px] border border-line bg-accent-soft px-4 py-3 text-sm leading-relaxed text-ink-soft">
          <Warning size={18} className="mt-0.5 shrink-0 text-accent" />
          {vehiclesDataset.arba_2026.warning}
        </p>
      ) : null}

      <section className="mt-10" id="calcular">
        <Calculator
          defaultYear={String(YEAR)}
          heading={`Estimar patente ${YEAR}`}
          submitLabel={vehicle.cta}
          contextLabel={name}
          footnote="El precio de lista de esta ficha no se carga como valuación. Usá el valor fiscal de la boleta o de ARBA."
        />
        <p className="mt-4 text-sm">
          <Link
            href="/guia/valuacion-fiscal/"
            className="font-semibold text-accent hover:text-accent-hover"
          >
            Cómo consultar la valuación fiscal
          </Link>
        </p>
      </section>

      <section className="mt-14">
        <h2 className="heading">Otros modelos</h2>
        <ul className="mt-5 divide-y border-y border-line">
          {related.map((item) => (
            <li key={item.slug}>
              <Link
                href={`/modelos/${item.slug}/`}
                className="group flex items-baseline justify-between gap-4 py-4"
              >
                <span>
                  <span className="font-medium text-foreground group-hover:text-accent">
                    {vehicleDisplayName(item)}
                  </span>
                  <span className="mt-1 block text-sm text-muted">
                    {item.body_type}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-sm text-muted">
                  {formatRank(item.sales.rank_2026_ytd)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm">
          <Link href="/modelos/" className="font-semibold text-accent hover:text-accent-hover">
            Ver todos los modelos
          </Link>
        </p>
      </section>
    </article>
  );
}
