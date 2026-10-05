import Image from "next/image";

type PageImageProps = {
  src: string;
  alt: string;
  /** aspect ratio class, default 16/10 */
  aspect?: string;
  priority?: boolean;
  className?: string;
};

export default function PageImage({
  src,
  alt,
  aspect = "aspect-[16/10]",
  priority = false,
  className = "",
}: PageImageProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-slate-200 shadow-[0_16px_48px_rgba(15,23,42,0.08)] ${aspect} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
        className="object-cover"
      />
    </div>
  );
}
