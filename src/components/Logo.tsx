import Image from "next/image";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Light treatment on dark sections (hero / open transparent nav) */
  onDark?: boolean;
};

/** Native wordmark aspect from processed asset ≈ 1128×377 */
const ASPECT = 1128 / 377;
const SIZES = {
  sm: { h: 36 },
  md: { h: 44 },
  lg: { h: 56 },
} as const;

/** Bump when logo binaries change so browsers/CDN drop stale assets */
const LOGO_V = "v22";

export default function Logo({
  className = "",
  size = "md",
  onDark = false,
}: LogoProps) {
  const h = SIZES[size].h;
  const w = Math.round(h * ASPECT);
  const src = onDark
    ? `/inovix-logo-on-dark.png?${LOGO_V}`
    : `/inovix-logo-dark.png?${LOGO_V}`;

  return (
    <span
      className={["inline-flex items-center leading-none", className]
        .filter(Boolean)
        .join(" ")}
    >
      <Image
        src={src}
        alt="INOVIX"
        width={w}
        height={h}
        priority
        unoptimized
        className="h-auto max-w-none object-contain"
        style={{
          height: h,
          width: "auto",
          filter: onDark
            ? "drop-shadow(0 1px 2px rgba(0,0,0,0.45))"
            : undefined,
        }}
      />
    </span>
  );
}
