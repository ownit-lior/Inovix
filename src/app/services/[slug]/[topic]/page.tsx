import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubServicePage from "@/components/services/SubServicePage";
import {
  getAllServiceTopics,
  getServiceTopic,
} from "@/lib/service-topics";

type Props = {
  params: Promise<{ slug: string; topic: string }>;
};

export function generateStaticParams() {
  return getAllServiceTopics().map((t) => ({
    slug: t.parent,
    topic: t.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, topic } = await params;
  const item = getServiceTopic(slug, topic);
  if (!item) return { title: "INOVIX" };
  return {
    title: `${item.title} | INOVIX`,
    description: item.metaDescription,
  };
}

export default async function Page({ params }: Props) {
  const { slug, topic } = await params;
  const item = getServiceTopic(slug, topic);
  if (!item) notFound();
  return <SubServicePage topic={item} />;
}
