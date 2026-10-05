"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PageHero from "@/components/pages/PageHero";
import PageImage from "@/components/pages/PageImage";
import { BLOG_POSTS, formatPostDate } from "@/lib/blog";
import { IMAGES } from "@/lib/images";

export default function BlogIndexPage() {
  return (
    <>
      <Navbar variant="solid" />
      <main>
        <PageHero
          eyebrow="הבלוג של INOVIX"
          title="תובנות, טיפים ומגמות בעולם הבית החכם"
          lead="מאמרים קצרים על אבטחה, תקשורת, אודיו־וידאו ובית חכם — כדי לעזור לכם לתכנן נכון."
          image={{
            src: IMAGES.blog.hero,
            alt: "מסך שליטה מרכזי לבית חכם שקוע בקיר בסלון מודרני",
          }}
        />

        <section className="bg-[var(--surface-soft)] py-14 sm:py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {BLOG_POSTS.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.04)]"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <PageImage
                      src={post.image}
                      alt={post.imageAlt}
                      aspect="aspect-[16/10]"
                      className="rounded-none shadow-none"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-2 text-xs text-[var(--muted)]">
                    <span className="rounded-full bg-[var(--teal)]/10 px-2.5 py-1 font-semibold text-[var(--teal)]">
                      {post.category}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  <time
                    dateTime={post.date}
                    className="mt-3 text-xs text-[var(--muted)]"
                  >
                    {formatPostDate(post.date)}
                  </time>
                  <h2 className="mt-2 text-lg font-bold leading-snug text-[var(--ink)]">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition hover:text-[var(--teal)]"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 text-sm font-semibold text-[var(--teal)] transition hover:underline"
                  >
                    קראו עוד ←
                  </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
