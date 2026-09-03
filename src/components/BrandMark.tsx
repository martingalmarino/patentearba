type BrandMarkProps = {
  variant?: "header" | "footer";
};

export function PlateIso({
  className,
  outline,
}: {
  className?: string;
  outline?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 48 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect
        x="0.75"
        y="0.75"
        width="46.5"
        height="30.5"
        rx="6"
        fill="#0034A0"
        stroke={outline ? "#FFFFFF" : "none"}
        strokeWidth={outline ? 1.25 : 0}
      />
      <rect x="3.5" y="9" width="41" height="19.25" rx="2.75" fill="#FFFFFF" />
    </svg>
  );
}

export function BrandMark({ variant = "header" }: BrandMarkProps) {
  const isFooter = variant === "footer";

  return (
    <span className="inline-flex items-center gap-2.5">
      <PlateIso
        outline={isFooter}
        className={`h-8 w-12 shrink-0 ${
          isFooter ? "" : "drop-shadow-[0_1px_2px_rgba(5,8,22,0.18)]"
        }`}
      />
      <span
        className={
          isFooter
            ? "text-[15px] font-bold tracking-[-0.04em] text-white"
            : "text-[15px] font-bold tracking-[-0.04em] text-ink"
        }
      >
        PATENTE ARBA
      </span>
    </span>
  );
}
