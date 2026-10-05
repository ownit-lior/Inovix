"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPost } from "@/lib/blog";
import { formatPostDate } from "@/lib/blog";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import PageImage from "@/components/pages/PageImage";

export default function BlogPostPage({ post }: { post: BlogPost }) {
  return (
    <>
      <Navbar variant="solid" />
      <main>
        <section className="bg-[var(--navy)] pt-24 pb-10 text-white sm:pt-28 md:pt-32 md:pb-12">
          <div className="mx-auto max-w-3xl px-3 sm:px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/blog"
                className="text-sm font-medium text-white/70 transition hover:text-white"
              >
                ← חזרה לבלוג
              </Link>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/65">
                <span className="rounded-full bg-white/10 px-2.5 py-1 font-semibold text-[var(--lime-bright)]">
                  {post.category}
                </span>
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span>{post.readTime} קריאה</span>
              </div>
              <h1 className="mt-4 text-2xl font-extrabold leading-tight sm:text-3xl md:text-4xl">
                {post.title}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
                {post.excerpt}
              </p>
            </motion.div>
          </div>
        </section>

        <div className="bg-white px-3 pb-2 sm:px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-3xl -mt-6 sm:-mt-8"
          >
            <PageImage
              src={post.image}
              alt={post.imageAlt}
              aspect="aspect-[16/9]"
              priority
            />
          </motion.div>
        </div>

        <article className="bg-white py-8 sm:py-10 md:py-12">
          <div className="mx-auto max-w-3xl space-y-5 px-3 sm:px-4 md:px-6">
            {post.body.map((block, i) => {
              const isHeading = block.startsWith("## ");
              const text = isHeading ? block.slice(3) : block;
              const MotionTag = isHeading ? motion.h2 : motion.p;

              return (
                <MotionTag
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  className={
                    isHeading
                      ? "pt-2 text-lg font-extrabold text-[var(--navy)] sm:text-xl"
                      : "text-sm leading-relaxed text-[var(--ink)]/85 sm:text-base sm:leading-8"
                  }
                >
                  {text}
                </MotionTag>
              );
            })}
          </div>
        </article>

        <section className="border-t border-slate-200 bg-[var(--surface-soft)] py-12 text-center sm:py-14">
          <div className="mx-auto max-w-xl px-3">
            <h2 className="text-xl font-extrabold text-[var(--ink)] sm:text-2xl">
              רוצים ליישם את זה בפרויקט שלכם?
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              נשמח לייעץ, לתכנן ולבצע עבורכם — בבית או בעסק.
            </p>
            <Link
              href="/#contact"
              className="brand-gradient-bg mt-5 inline-flex min-h-12 items-center justify-center rounded-full px-8 py-3.5 text-sm font-bold text-[var(--navy)] transition hover:brightness-110"
            >
              צרו קשר לייעוץ
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
