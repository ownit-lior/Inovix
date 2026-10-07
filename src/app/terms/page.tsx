import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { CONTACT } from "@/lib/contact";

export const metadata: Metadata = {
  title: "תנאי שימוש | INOVIX",
  description:
    "תנאי השימוש באתר INOVIX — מידע על השימוש באתר, תכנים, פניות ושירותים.",
};

export default function TermsPage() {
  return (
    <div className="bg-[var(--navy)] text-white">
      <Navbar />
      <main id="main-content" className="bg-[var(--surface)] text-[var(--ink)]">
        <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-xs font-semibold tracking-[0.18em] text-[var(--teal)] uppercase">
            משפטי
          </p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">תנאי שימוש</h1>
          <div className="mt-4 h-px w-14 bg-[var(--lime)]/60" />

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-[var(--ink)]/85 sm:text-base">
            <p>
              ברוכים הבאים לאתר INOVIX («האתר»). השימוש באתר, בתכניו ובשירותים
              המוצגים בו כפוף לתנאי שימוש אלה. גלישה באתר או השארת פרטים מהווים
              הסכמה לתנאים אלה. אם אינכם מסכימים להם — אנא הימנעו משימוש באתר.
            </p>

            <section>
              <h2 className="text-lg font-bold text-[var(--ink)]">1. כללי</h2>
              <p className="mt-3">
                האתר מופעל על ידי INOVIX ומציג מידע על שירותי ייעוץ, תכנון והתקנה
                בתחומי אבטחה, תקשורת, אודיו־וידאו ובית חכם. התנאים חלים על כל
                משתמש באתר, בכל מכשיר ובכל ערוץ גישה.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--ink)]">
                2. מידע באתר ואינו הצעה מחייבת
              </h2>
              <p className="mt-3">
                התכנים באתר נועדו למידע כללי בלבד. תיאורי שירותים, דוגמאות,
                תמונות ומחירים (אם מופיעים) אינם מהווים הצעה מחייבת, התחייבות
                חוזית או ייעוץ מקצועי סופי. כל התקשרות לשירות תיעשה בהסכמה נפרדת
                בין הצדדים, לאחר אפיון והצעת מחיר מתאימה.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--ink)]">
                3. יצירת קשר והשארת פרטים
              </h2>
              <p className="mt-3">
                בעת מילוי טופס פנייה, שליחת הודעת WhatsApp או יצירת קשר בטלפון,
                הנכם מאשרים כי הפרטים שמסרתם נכונים ומעודכנים, וכי אתם מסכימים
                שניצור עמכם קשר לצורך מענה לפנייתכם. אין חובה למסור פרטים; ללא
                פרטי קשר ייתכן שלא נוכל לחזור אליכם.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--ink)]">
                4. קניין רוחני
              </h2>
              <p className="mt-3">
                כל הזכויות באתר — לרבות טקסטים, עיצוב, לוגו, תמונות, סרטונים,
                קוד ומבנה — שייכות ל־INOVIX או לבעלי זכויות אחרים שהעניקו לנו
                רישיון שימוש. אין להעתיק, לשכפל, להפיץ, לשנות או להשתמש בתכנים
                אלה לצרכים מסחריים ללא אישור מראש ובכתב.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--ink)]">
                5. שימוש מותר ואסור
              </h2>
              <ul className="mt-3 list-disc space-y-2 pr-5">
                <li>אין להשתמש באתר באופן בלתי חוקי או באופן הפוגע באחרים</li>
                <li>
                  אין לנסות לפרוץ, לשבש, להעמיס או לפגוע בפעילות התקינה של האתר
                </li>
                <li>
                  אין לאסוף מידע מהאתר באמצעים אוטומטיים באופן הפוגע בשירות או
                  בפרטיות
                </li>
                <li>
                  אין להציג את האתר או חלקיו במסגרת framing או באופן מטעה לגבי
                  מקור התכנים
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--ink)]">
                6. קישורים לאתרים חיצוניים
              </h2>
              <p className="mt-3">
                באתר עשויים להופיע קישורים לאתרים או לשירותים של צדדים שלישיים
                (למשל רשתות חברתיות או WhatsApp). אין לנו שליטה על תכנים או
                מדיניות באתרים אלה, ואיננו אחראים להם. השימוש בהם הוא באחריותכם
                ובהתאם לתנאיהם.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--ink)]">
                7. הגבלת אחריות
              </h2>
              <p className="mt-3">
                האתר והתכנים בו מסופקים «כפי שהם» (As Is). נעשה מאמץ לשמור על
                מידע מדויק ועדכני, אך ייתכנו אי־דיוקים, השמטות או תקלות טכניות.
                ככל שהדין מתיר, לא נהיה אחראים לנזק ישיר או עקיף הנובע משימוש
                באתר או מהסתמכות על תכניו בלבד. אחריות לגבי שירותי התקנה או
                מוצרים תיקבע בהסכמים ובתעודות האחריות הרלוונטיים לכל פרויקט.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--ink)]">
                8. שינויים באתר ובתנאים
              </h2>
              <p className="mt-3">
                אנו רשאים לעדכן את האתר, להסיר תכנים או לשנות תנאי שימוש אלה מעת
                לעת. תאריך העדכון האחרון יופיע בתחתית העמוד. המשך שימוש באתר לאחר
                שינוי מהווה הסכמה לתנאים המעודכנים.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--ink)]">
                9. דין וסמכות שיפוט
              </h2>
              <p className="mt-3">
                על תנאי שימוש אלה יחולו דיני מדינת ישראל. סמכות השיפוט הבלעדית
                בכל מחלוקת הנוגעת לאתר או לתנאים אלה נתונה לבתי המשפט המוסמכים
                בישראל.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[var(--ink)]">10. יצירת קשר</h2>
              <p className="mt-3">
                לשאלות בנוגע לתנאי שימוש אלה ניתן לפנות אלינו:
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
