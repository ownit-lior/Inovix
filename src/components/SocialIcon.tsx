import type { ReactNode } from "react";
import type { SocialLink } from "@/lib/social";

type IconProps = { className?: string };

function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="12" cy="12" r="4.25" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.25" cy="6.75" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M14.5 9.5V7.8c0-.7.2-1.1 1.2-1.1H17V4h-2.3C11.9 4 11 5.5 11 7.6v1.9H9v2.7h2V20h3.5v-7.8h2.3l.4-2.7H14.5z" />
    </svg>
  );
}

function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.6 8.4c-1.5-.1-2.9-.7-4-1.7v7.1c0 3.2-2.6 5.8-5.8 5.8S4 17 4 13.8s2.6-5.8 5.8-5.8c.3 0 .6 0 .9.1v2.9a2.9 2.9 0 0 0-.9-.1c-1.6 0-2.9 1.3-2.9 2.9s1.3 2.9 2.9 2.9 2.9-1.3 2.9-2.9V3.5h2.8c.2 1.6 1.2 3 2.6 3.7.8.4 1.7.6 2.5.6v2.6z" />
    </svg>
  );
}

function YouTubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.9C18.2 5 12 5 12 5s-6.2 0-7.8.3A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.9C5.8 19 12 19 12 19s6.2 0 7.8-.3a2.6 2.6 0 0 0 1.8-1.9A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8zM10 15.2V8.8L15.5 12 10 15.2z" />
    </svg>
  );
}

const ICONS: Record<string, (p: IconProps) => ReactNode> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  tiktok: TikTokIcon,
  youtube: YouTubeIcon,
};

export default function SocialIcon({
  link,
  className = "h-5 w-5",
}: {
  link: SocialLink;
  className?: string;
}) {
  const Icon = ICONS[link.id];
  if (!Icon) return null;
  return <Icon className={className} />;
}
