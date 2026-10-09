"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import AmbientOrbs from "@/components/effects/AmbientOrbs";
import Magnetic from "@/components/effects/Magnetic";
import SectionShapes from "@/components/effects/SectionShapes";
import { formatPostDate, getLatestPosts } from "@/lib/blog";

const POSTS = getLatestPosts(3);

export default function HomeBlog() {
  return (
    <section
      id="blog"
      className="brand-section relative py-16 sm:py-20 md:py-24"
    >
      <AmbientOrbs />
      <SectionShapes variant="lime" />
      <div className="film-grain" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-xs font-semibold tracking-[0.2em] text-[var(--lime-bright)] uppercase sm:text-sm">
              בלוג
            </p>
            <h2 className="mt-3 max-w-xl text-2xl font-extrabold text-white sm:text-3xl md:text-4xl">
              ידע מהשטח — תכנון, טכנולוגיה וביצוע
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
              מדריכים ומאמרים שיעזרו לכם להבין מה באמת חשוב בפרויקט — לפני שבוחרים
              ציוד.
            </p>
          </motion.div>

          <Magnetic strength={0.25}>
            <Link
              href="/blog"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[var(--lime)]/50 hover:bg-white/10"
            >
              לכל המאמרים ←
            </Link>
          </Magnetic>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {POSTS.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block h-full overflow-hidden border border-white/10 bg-white/[0.03] transition hover:border-[var(--lime)]/35 hover:bg-white/[0.06]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[var(--navy)]">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--navy)]/70 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-3 start-3 rounded-full bg-[var(--navy)]/75 px-2.5 py-1 text-[0.7rem] font-semibold tracking-wide text-[var(--lime-bright)] backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <p className="text-xs text-white/45">
                    {formatPostDate(post.date)} · {post.readTime}
                  </p>
                  <h3 className="mt-2 line-clamp-2 text-base font-bold leading-snug text-white transition group-hover:text-[var(--lime-bright)] sm:text-lg">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/60">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 text-sm font-semibold text-white/70 transition group-hover:text-[var(--lime-bright)]">
                    לקריאה ←
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
