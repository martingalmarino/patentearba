import vehiclesData from "@/data/vehicles-top-sales-2025-2026.json";
import { moneyFormatter, numberFormatter } from "@/lib/calc";

export type VehiclePriceReference = {
  from: number;
  to: number;
  entry_version: string;
  price_date: string;
  type: string;
};

export type VehicleTechnicalSpecs = {
  engine: string;
  displacement_cc: number | string;
  power_cv: number | string;
  torque_nm: number | string;
  fuel: string;
  transmission: string;
  traction: string;
  length_mm: number | string;
  trunk_l: number | null;
  cargo_capacity_kg: string | null;
  airbags: number | string;
};

export type VehicleSales = {
  rank_2025: number | null;
  registrations_2025: number | null;
  rank_2026_ytd: number | null;
  registrations_2026_through_august: number | null;
};

export type Vehicle = {
  id: string;
  brand: string;
  model: string;
  slug: string;
  body_type: string;
  origin: string;
  seo_title: string;
  meta_description: string;
  short_description: string;
  price_reference: VehiclePriceReference;
  technical_specs: VehicleTechnicalSpecs;
  sales: VehicleSales;
  cta: string;
};

export type VehicleSource = {
  name: string;
  url: string;
  used_for: string;
};

export type VehiclesDatasetMeta = {
  name: string;
  generated_at: string;
  currency: string;
  market: string;
  tax_jurisdiction: string;
  selection_method: string;
  price_definition: string;
  implementation_note: string;
  arba_2026: {
    warning: string;
  };
};

const data = vehiclesData as {
  dataset: VehiclesDatasetMeta;
  vehicles: Vehicle[];
  sources: VehicleSource[];
};

export const vehiclesDataset = data.dataset;
export const vehicleSources = data.sources;

export function getAllVehicles(): Vehicle[] {
  return [...data.vehicles].sort((a, b) => {
    const rankA = a.sales.rank_2026_ytd ?? Number.POSITIVE_INFINITY;
    const rankB = b.sales.rank_2026_ytd ?? Number.POSITIVE_INFINITY;
    return rankA - rankB;
  });
}

export function getVehicle(slug: string): Vehicle | undefined {
  return data.vehicles.find((vehicle) => vehicle.slug === slug);
}

export function getPopularVehicles(limit = 6): Vehicle[] {
  return getAllVehicles().slice(0, limit);
}

export function getRelatedVehicles(slug: string, limit = 3): Vehicle[] {
  const all = getAllVehicles();
  const currentIndex = all.findIndex((vehicle) => vehicle.slug === slug);
  if (currentIndex < 0) return all.slice(0, limit);

  const related: Vehicle[] = [];
  for (let offset = 1; related.length < limit && offset < all.length; offset += 1) {
    const next = all[(currentIndex + offset) % all.length];
    if (next.slug !== slug) related.push(next);
  }
  return related;
}

export function vehicleDisplayName(vehicle: Vehicle): string {
  return `${vehicle.brand} ${vehicle.model}`;
}

export function isPickup(vehicle: Vehicle): boolean {
  return vehicle.body_type.toLowerCase().includes("pick-up");
}

export function formatPriceRange(vehicle: Vehicle): string {
  const { from, to } = vehicle.price_reference;
  return `${moneyFormatter.format(from)} a ${moneyFormatter.format(to)}`;
}

export function formatRegistrations(value: number | null): string {
  if (value == null) return "Sin dato";
  return numberFormatter.format(value);
}

export function formatRank(value: number | null): string {
  if (value == null) return "Sin ranking";
  return `#${value}`;
}
