import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "הצהרת נגישות | INOVIX",
  description: "הצהרת נגישות של אתר INOVIX — מידע על התאמות נגישות ודרכי פנייה.",
};

export default function AccessibilityPage() {
  return (
    <div className="bg-[var(--navy)] text-white">
      <Navbar />
      <main id="main-content" className="bg-[var(--surface)] text-[var(--ink)]">
        <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold tracking-[0.18em] text-[var(--teal)] uppercase">
            נגישות
          </p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">הצהרת נגישות</h1>
          <div className="mt-4 h-px w-14 bg-[var(--lime)]/60" />

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-[var(--ink)]/85 sm:text-base">
            <p>
              אתר INOVIX פועל להנגשת תכניו ושירותיו לכלל הציבור, לרבות אנשים עם
              מוגבלויות, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות ולהתקנות
              הנגישות בישראל.
            </p>

            <section>
              <h2 className="text-lg font-bold text-[var(--ink)]">התאמות באתר</h2>
              <ul className="mt-3 list-disc space-y-2 pr-5">
                <li>תפריט נגישות עם הגדלת טקסט, ניגודיות גבוהה והדגשת קישורים</li>
                <li>אפשרות להפסקת אנימציות ולגופן קריא יותר</li>
                <li>ניווט מקלדת וקישור לדילוג לתוכן המרכזי</li>
                <li>מבנה סמנטי ותמיכה בקוראי מסך</li>
                <li>ממשק בעברית ובכיוון RTL</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--ink)]">איך משתמשים?</h2>
              <p className="mt-3">
                לחצו על כפתור הנגישות בפינה השמאלית התחתונה של המסך, בחרו את
                ההתאמות הרצויות, או עברו ישירות לעמוד זה דרך הקישור בפוטר.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--ink)]">פניות בנושא נגישות</h2>
              <p className="mt-3">
                נתקלתם בבעיית נגישות? נשמח לתקן. פנו אלינו:
              </p>
              <p className="mt-2">
                טלפון:{" "}
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="font-semibold text-[var(--teal)] underline-offset-2 hover:underline"
                  dir="ltr"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </p>
              <p className="mt-2">
                או דרך{" "}
                <Link
                  href="/#contact"
                  className="font-semibold text-[var(--teal)] underline-offset-2 hover:underline"
                >
                  טופס יצירת הקשר
                </Link>{" "}
                באתר.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--ink)]">מידע נוסף</h2>
              <p className="mt-3">
                אנו ממשיכים לשפר את נגישות האתר באופן שוטף. ייתכן שחלקים מסוימים
                יידרשו להתאמה נוספת — נטפל בפניות בהקדם האפשרי.
              </p>
              <p className="mt-3 text-[var(--muted)]">
                עדכון אחרון: אוקטובר 2026
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
