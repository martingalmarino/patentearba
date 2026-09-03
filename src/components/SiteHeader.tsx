"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import { useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { navItems } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-card">
      <div className="border-b border-line bg-accent-soft">
        <p className="mx-auto max-w-7xl px-4 py-2 text-center text-[13px] leading-snug text-ink-soft md:text-left">
          Simulador de Patente ARBA 2026
        </p>
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4">
        <Link
          href="/"
          className="shrink-0"
          aria-label="Patente ARBA, ir al inicio"
        >
          <BrandMark />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm ${
                  active
                    ? "font-semibold text-accent"
                    : "text-muted hover:text-accent"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] border border-line lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <List size={20} />}
        </button>
      </div>
      {open ? (
        <nav
          className="grid gap-1 border-t border-line px-4 py-3 lg:hidden"
          aria-label="Móvil"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-[8px] px-3 py-2 text-sm text-foreground hover:bg-accent-soft"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
