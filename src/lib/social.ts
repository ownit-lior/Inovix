export type SocialLink = {
  id: string;
  name: string;
  href: string;
};

/** Social profiles — update hrefs when accounts are ready */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "instagram",
    name: "Instagram",
    href: "https://www.instagram.com/",
  },
  {
    id: "facebook",
    name: "Facebook",
    href: "https://www.facebook.com/",
  },
  {
    id: "tiktok",
    name: "TikTok",
    href: "https://www.tiktok.com/",
  },
  {
    id: "youtube",
    name: "YouTube",
    href: "https://www.youtube.com/",
  },
];
