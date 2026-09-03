import Link from "next/link";
import { ArrowSquareOut } from "@phosphor-icons/react/dist/ssr";
import { BrandMark } from "@/components/BrandMark";
import {
  ARBA_URL,
  AUTHOR_NAME,
  CONTACT_EMAIL,
  footerLegal,
  navItems,
  otherCalculators,
} from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-footer text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <p>
            <BrandMark variant="footer" />
          </p>
          <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-white/75">
            Herramienta de estimación del impuesto automotor en la Provincia de
            Buenos Aires. El resultado no reemplaza la boleta ni la liquidación
            de ARBA.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Sitio</p>
          <ul className="mt-3 grid gap-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/75 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Legal</p>
          <ul className="mt-3 grid gap-2 text-sm">
            {footerLegal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-white/75 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={ARBA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white/75 hover:text-white"
              >
                Sitio oficial de ARBA
                <ArrowSquareOut size={14} />
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">Otras calculadoras</p>
          <ul className="mt-3 grid gap-2 text-sm">
            {otherCalculators.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-white/75 hover:text-white"
                >
                  {item.label}
                  <ArrowSquareOut size={14} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-7xl px-4 py-4 text-sm text-white/75">
          Hecho por {AUTHOR_NAME}.{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-white hover:underline">
            {CONTACT_EMAIL}
          </a>
        </p>
      </div>
    </footer>
  );
}
