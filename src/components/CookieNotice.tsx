"use client";

import Link from "next/link";
import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "patente-pba-privacy-ok";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) !== "1";
}

function getServerSnapshot() {
  return false;
}

export function CookieNotice() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const dismiss = useCallback(() => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    window.dispatchEvent(new Event("storage"));
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-card px-4 py-4 shadow-[0_-8px_24px_rgba(24,24,27,0.08)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[62ch] text-sm leading-relaxed text-ink-soft">
          Este sitio puede usar cookies de Google AdSense para mostrar anuncios.
          Detalles en la{" "}
          <Link href="/privacidad/" className="font-medium text-accent hover:text-accent-hover">
            política de privacidad
          </Link>
          .
        </p>
        <button
          type="button"
          className="inline-flex h-10 shrink-0 items-center justify-center rounded-[8px] bg-accent px-4 text-sm font-semibold text-white hover:bg-accent-hover active:scale-[0.98]"
          onClick={dismiss}
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
