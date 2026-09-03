import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import {
  JsonLd,
  breadcrumbJsonLd,
  buildPageMetadata,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import {
  formatPriceRange,
  formatRegistrations,
  getAllVehicles,
  vehicleDisplayName,
  vehiclesDataset,
} from "@/lib/vehicles";

export const metadata: Metadata = buildPageMetadata({
  title: "Autos más vendidos y patente ARBA 2026",
  description:
    "Ranking de los autos más patentados en Argentina 2025-2026. Entrá a cada ficha y estimá la patente ARBA en la Provincia de Buenos Aires.",
  path: "/modelos/",
  keywords: [
    "autos más vendidos Argentina",
    "patente ARBA por modelo",
    "ranking patentamientos 2026",
    "calcular patente Hilux Cronos",
  ],
});

const vehicles = getAllVehicles();

const collectionLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Autos más vendidos y patente ARBA 2026",
  description:
    "Modelos de mayor volumen de patentamientos en Argentina con estimación de impuesto automotor ARBA.",
  url: `${SITE_URL}/modelos/`,
  hasPart: vehicles.map((vehicle) => ({
    "@type": "Vehicle",
    name: vehicleDisplayName(vehicle),
    brand: vehicle.brand,
    model: vehicle.model,
    url: `${SITE_URL}/modelos/${vehicle.slug}/`,
    description: vehicle.meta_description,
  })),
};

export default function ModelosIndexPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14">
      <JsonLd data={collectionLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Modelos", path: "/modelos/" },
        ])}
      />

      <h1 className="title title-page">
        <span className="block">Autos más vendidos</span>
        <span className="title-accent">y su patente ARBA.</span>
      </h1>
      <p className="mt-4 max-w-[62ch] text-muted">
        Ranking editorial de los modelos con más patentamientos en 2025 y en el
        acumulado 2026. En cada ficha podés estimar el impuesto automotor de la
        Provincia de Buenos Aires.
      </p>
      <p className="mt-3 max-w-[62ch] text-sm text-muted">
        Los precios son sugeridos de lista. No son la valuación fiscal que usa ARBA.
      </p>

      <ul className="mt-10 divide-y border-y border-line">
        {vehicles.map((vehicle) => (
          <li key={vehicle.slug}>
            <Link
              href={`/modelos/${vehicle.slug}/`}
              className="group flex items-start justify-between gap-6 py-6"
            >
              <span className="min-w-0">
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-sm font-semibold text-accent">
                    #{vehicle.sales.rank_2026_ytd}
                  </span>
                  <span className="text-xl font-semibold tracking-tight text-foreground group-hover:text-accent">
                    {vehicleDisplayName(vehicle)}
                  </span>
                </span>
                <span className="mt-2 block text-sm text-muted">
                  {vehicle.body_type} · Origen {vehicle.origin}
                </span>
                <span className="mt-2 block text-sm text-ink-soft">
                  Patentamientos ene-ago 2026:{" "}
                  {formatRegistrations(
                    vehicle.sales.registrations_2026_through_august,
                  )}
                </span>
                <span className="mt-1 block text-sm text-muted">
                  Precio de lista: {formatPriceRange(vehicle)}
                </span>
              </span>
              <ArrowRight
                size={18}
                className="mt-1 shrink-0 text-muted group-hover:text-accent"
              />
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-sm leading-relaxed text-muted">
        {vehiclesDataset.selection_method} Actualizado{" "}
        {vehiclesDataset.generated_at}.
      </p>
    </article>
  );
}
