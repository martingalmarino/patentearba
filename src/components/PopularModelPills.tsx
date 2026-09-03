import Link from "next/link";
import { getPopularVehicles, vehicleDisplayName } from "@/lib/vehicles";

export function PopularModelPills() {
  const vehicles = getPopularVehicles(6);

  return (
    <div className="mt-6">
      <p className="text-sm font-medium text-ink-soft">Modelos más patentados</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {vehicles.map((vehicle) => (
          <li key={vehicle.slug}>
            <Link
              href={`/modelos/${vehicle.slug}/`}
              className="inline-flex items-center rounded-[8px] border border-line bg-card px-3 py-1.5 text-[13px] font-semibold text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              {vehicleDisplayName(vehicle)}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm">
        <Link href="/modelos/" className="font-semibold text-accent hover:text-accent-hover">
          Ver todos los modelos
        </Link>
      </p>
    </div>
  );
}
