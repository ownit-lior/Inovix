import { IMAGES } from "@/lib/images";

export type ServiceSlug = "security" | "networking" | "av" | "smart-home";

export type ServiceHighlightIcon =
  | "phone"
  | "eye"
  | "home"
  | "plan"
  | "wifi"
  | "rack"
  | "devices"
  | "shield"
  | "cinema"
  | "outdoor"
  | "speaker"
  | "office"
  | "knx"
  | "zigbee"
  | "zwave"
  | "control";

export type ServiceHighlight = {
  text: string;
  icon: ServiceHighlightIcon;
};

export type ServiceEcosystem = {
  eyebrow: string;
  title: string;
  body: string;
};

export type Service = {
  slug: ServiceSlug;
  href: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  summary: string;
  heroLead: string;
  image: string;
  imageAlt: string;
  highlights: ServiceHighlight[];
  offerings: { title: string; desc: string; image?: string; imageAlt?: string; imageFit?: "cover" | "contain" }[];
  audience: string;
  /** Optional override for the overview section headline */
  overviewTitle?: string;
  ecosystem?: ServiceEcosystem;
};

export const SERVICES: Service[] = [
  {
    slug: "security",
    href: "/services/security",
    title: "מערכות אבטחה",
    shortTitle: "אבטחה",
    eyebrow: "אבטחה מתקדמת",
    summary:
      "מעטפת הגנה חכמה הכוללת מצלמות עם אנליטיקה, מערכות אזעקה היברידיות ואינטרקום מעוצב. טכנולוגיה מדויקת שמעניקה שליטה מלאה ושקט נפשי, 24/7.",
    heroLead:
      "שקט נפשי הוא לא מותרות — הוא התוצאה של מערכת אבטחה שתוכננה ובוצעה ברמת טכנולוגיה גבוהה, לבתים, וילות ופרויקטים מורכבים.",
    image: IMAGES.services.security,
    imageAlt: "מצלמת PTZ מתקדמת על חזית וילה יוקרתית",
    highlights: [
      { text: "שליטה מלאה מרחוק ובזמן אמת", icon: "phone" },
      { text: "התראות חכמות וצפייה חיה מכל מקום", icon: "eye" },
      { text: "אינטגרציה עם בית חכם ובקרת כניסה", icon: "home" },
      { text: "תכנון וביצוע מקצה לקצה", icon: "plan" },
    ],
    offerings: [
      {
        title: "מצלמות",
        desc: "מערכות CCTV מתקדמות עם אנליטיקה חכמה (DDA) שמבדילה בין אדם לרכב, קווי הגנה וירטואליים להתראה לפני חדירה, ואפשרויות למצלמות ממונעות (PTZ) לכיסוי שטחים גדולים — בווילות, חניונים ומתחמים מורכבים.",
        image: IMAGES.services.securityCameras,
        imageAlt: "מצלמת אבטחה PTZ ממונעת על חזית נכס יוקרתי",
      },
      {
        title: "אזעקה",
        desc: "מערכות אזעקה היברידיות (קוויות ואלחוטיות) המותאמות לתשתית הקיימת, עם שליטה מלאה מאפליקציה מתקדמת בענן ורכיבים אמינים של יצרנים מובילים — הגנה היקפית מדויקת בלי להתפשר על יציבות.",
        image: IMAGES.services.securityAlarm,
        imageAlt:
          "גלאי וילון Paradox מותקן על דופן משקוף הוטרינה ומביט לרוחב הפתח",
        imageFit: "cover",
      },
      {
        title: "אינטרקום",
        desc: "פנלים מעוצבים ובקרת כניסה חכמה — קודן מגע, קורא קרבה (RFID) ואפשרויות זיהוי פנים במערכות גישה מתקדמות. אסתטיקה של כניסה יוקרתית עם שליטה וניהול הרשאות מלאים.",
        image: IMAGES.services.securityIntercom,
        imageAlt: "אינטרקום חכם עם מסך וידאו בכניסה לווילה",
      },
    ],
    audience:
      "לוילות יוקרה, בתים פרטיים, חניונים, משרדים ופרויקטים מורכבים שדורשים אבטחה ברמת טכנולוגיה גבוהה.",
    ecosystem: {
      eyebrow: "אקו־סיסטם אחד",
      title: "האבטחה והבית החכם שלכם מסונכרנים",
      body: "למה לקפוץ בין אפליקציות שונות למצלמות, לאזעקה ולאינטרקום? המומחיות שלנו ב־INOVIX היא לחבר את כל מערכות ההגנה שלכם ישירות למערכת הבית החכם. תכנון חכם ומוקפד מאפשר ליצור תרחישים אוטומטיים: דריכת האזעקה ביציאה מהבית תכבה את כל האורות ותסגור תריסים, וצלצול באינטרקום יקפיץ את תמונת האורח ישירות למסכי המגע בסלון. הכל בממשק שליטה אחד, פשוט ונוח.",
    },
  },
  {
    slug: "networking",
    href: "/services/networking",
    title: "מערכות תקשורת",
    shortTitle: "תקשורת",
    eyebrow: "תשתיות רשת",
    overviewTitle: "תשתית חזקה היא הלב של בית חכם",
    summary:
      "המערכות המתקדמות ביותר בעולם לא שוות הרבה בלי רשת תקשורת יציבה שתחזיק אותן. ב־INOVIX אנחנו מתכננים ומבצעים רשתות תקשורת חכמות ונסתרות, שנועדו לעמוד בעומסים של בתי יוקרה ועסקים מודרניים — עם ציוד מוביל כמו Ubiquiti UniFi.",
    heroLead:
      "רשת יציבה היא הבסיס לכל מערכת חכמה — ממצלמות ועד סטרימינג, עבודה מהבית ואודיו־וידאו.",
    image: IMAGES.services.networking,
    imageAlt: "ארון תקשורת מסודר עם חיווט מוקפד ותאורת LED",
    highlights: [
      { text: "כיסוי Wi‑Fi מלא בכל פינה", icon: "wifi" },
      { text: "תשתית מאורגנת, נקייה ומוכנה לעתיד", icon: "rack" },
      { text: "יציבות למספר רב של מכשירים", icon: "devices" },
      { text: "אבטחת רשת ברמה מקצועית", icon: "shield" },
    ],
    offerings: [
      {
        title: "ארונות תקשורת ייעודיים",
        desc: "ארונות תקשורת מעוצבים ומסודרים בקפידה, הכוללים מערכות קירור שקטות. חיווט אסתטי ברמת גימור מושלמת, עם תכנון חכם המאפשר הרחבה עתידית בקלות.",
        image: IMAGES.services.networkingRack,
        imageAlt: "ארון תקשורת מסודר עם חיווט מקצועי ותאורת סטטוס",
      },
      {
        title: "תשתיות תקשורת",
        desc: "פריסת כבילה מתקדמת המותאמת אישית למבנה. תשתית רובוסטית שמהווה את עמוד השדרה לכל מערכות הבית החכם, האודיו והאבטחה.",
        image: IMAGES.services.networkingCat7,
        imageAlt: "כבל רשת Cat 7 מסוכך עם מחברי RJ45 איכותיים",
      },
      {
        title: "סוויצ׳ים וראוטרים",
        desc: "שילוב ציוד קצה מתקדם ומתגים מנוהלים (Managed Switches) התומכים בעומסי עבודה כבדים, הפרדת רשתות (VLAN) לאבטחה מקסימלית וביצועים ללא פשרות — כולל פתרונות מובילים כמו Ubiquiti UniFi.",
        image: IMAGES.services.networkingSwitch,
        imageAlt: "סוויץ׳ מנוהל מותקן בארון תקשורת עם חיווט מסודר",
      },
      {
        title: "אקסס פוינט",
        desc: "תכנון ופריסה של נקודות גישה (Access Points) מהדור החדש, כולל תמיכה ב־Wi‑Fi 7, ליצירת רשת Mesh חלקה. כיסוי אלחוטי עוצמתי ויציב ללא ניתוקים — גם בבתים רחבי ידיים או בשטחים חיצוניים.",
        image: IMAGES.services.networkingAp,
        imageAlt: "נקודת גישה אלחוטית מודרנית מותקנת בתקרה בבית יוקרתי",
      },
    ],
    audience:
      "מסטרימינג באיכות 4K בחדר הקולנוע, דרך מצלמות אבטחה שמשדרות ברצף ועד לעבודה רציפה מהבית — הכל עובד חלק, מהיר וללא ניתוקים. תכנון מוקפד, ביצוע נקי וציוד מהשורה הראשונה, כדי שאתם פשוט תיהנו מהחוויה.",
  },
  {
    slug: "av",
    href: "/services/av",
    title: "מערכות אודיו־וידאו",
    shortTitle: "אודיו־וידאו",
    eyebrow: "חוויית AV",
    summary:
      "פתרונות אודיו־וידאו לבית, לחוץ ולמשרד — מסכים, מערכות שמע, מתקנים ייעודיים וקולנוע ביתי ברמה גבוהה.",
    heroLead:
      "בידור יוקרתי שלא מתפשר על האסתטיקה — סאונד מדויק, תמונה חדה, והשתלבות מושלמת בעיצוב.",
    image: IMAGES.services.av,
    imageAlt: "סלון מעוצב עם רמקולים אדריכליים שקועים בתקרה",
    highlights: [
      { text: "קולנוע ביתי ברמה גבוהה", icon: "cinema" },
      { text: "פתרונות לבית ולחוץ", icon: "outdoor" },
      { text: "מערכות שמע ומסכים איכותיים", icon: "speaker" },
      { text: "פתרונות AV גם למשרדים", icon: "office" },
    ],
    offerings: [
      {
        title: "מתקנים ייעודיים לבית ולחוץ",
        desc: "מעליות מסך נסתרות בתקרה, זרועות חשמליות ומתקני חוץ עמידים לתנאי מזג האוויר. אנו דואגים שהטכנולוגיה תופיע רק כשצריך אותה, ותיעלם כבמטה קסם.",
        image: IMAGES.services.avMounts,
        imageAlt: "מעלית מסך נסתרת יורדת מתקרה בסלון יוקרתי",
      },
      {
        title: "מסכים וטלוויזיות לבית ולחוץ",
        desc: "שילוב מסכי ענק דקים, מסכי חוץ (Outdoor TV) עמידים לסביבת הבריכה, ומסכי מראה (Mirror TV) המשתלבים כרהיט דקורטיבי. איכות צפייה 4K/8K ללא פשרות.",
        image: IMAGES.services.avScreens,
        imageAlt: "טלוויזיית חוץ ליד בריכה בווילה יוקרתית",
      },
      {
        title: "מערכות שמע איכותיות לבית ולחוץ",
        desc: "אזור שמע רב־חללי (Multi-Room) המנוהל באפליקציה אחת. שילוב של רמקולים אדריכליים שקועים (In-Ceiling/In-Wall) ופתרונות סאונד מוסווים לגינה מבית המותגים המובילים בעולם (כדוגמת Sonos ו־Denon).",
        image: IMAGES.services.avAudio,
        imageAlt: "רמקול נוף חיצוני בגינת וילה ליד בריכה ומטבח חוץ",
      },
      {
        title: "מערכות אודיו־וידאו למשרדים",
        desc: "חדרי ישיבות חכמים המאפשרים התחלת פגישה בלחיצת כפתור (One-Touch Join). שילוב פסי קול ייעודיים, מערכות שיתוף מסך אלחוטיות ושמע היקפי ברור לשיחות וידאו מושלמות.",
        image: IMAGES.services.avOffice,
        imageAlt: "חדר ישיבות חכם עם מסך גדול ופסי קול",
      },
      {
        title: "קולנוע ביתי",
        desc: "מקרני 4K, מסכי הקרנה ענקיים ומערכות סאונד היקפי (Dolby Atmos). תכנון אקוסטי מוקפד המבטיח חוויית קולנוע עוצרת נשימה, אצלכם בסלון או בחדר ייעודי.",
        image: IMAGES.services.avCinema,
        imageAlt: "חדר קולנוע ביתי עם מסך הקרנה ומקרן 4K",
      },
    ],
    audience: "לבתים ולחללים עסקיים שרוצים חוויית בידור יוקרתית בלי לוותר על העיצוב.",
    ecosystem: {
      eyebrow: "חיבור לבית החכם",
      title: "לחיצה אחת — והבית נכנס למצב סרט",
      body: "דמיינו את זה: לחיצה על כפתור «סרט» מורידה את התריסים, מעמעמת את התאורה ל־20%, חושפת את המסך הנסתר ומדליקה את המגבר. הכל מסונכרן.",
    },
  },
  {
    slug: "smart-home",
    href: "/services/smart-home",
    title: "מערכות חשמל ובית חכם",
    shortTitle: "חשמל ובית חכם",
    eyebrow: "אוטומציה חכמה",
    summary:
      "מערכות חשמל חכם ובית חכם בתקנים מובילים — KNX עם Control4, Palwintec בזיגבי, ו־Domex ב־Z‑Wave — לשליטה מדויקת ונוחה בכל הנכס.",
    heroLead:
      "כשהכל מחובר נכון, הטכנולוגיה נעלמת — ונשארת חוויה חלקה, אינטואיטיבית ומדויקת.",
    image: IMAGES.services.smartHome,
    imageAlt: "מסך מגע מרכזי שקוע בקיר לניהול הבית החכם",
    highlights: [
      { text: "תקן KNX עם מערכת Control4", icon: "knx" },
      { text: "חשמל חכם Palwintec בזיגבי", icon: "zigbee" },
      { text: "חשמל חכם Domex ב־Z‑Wave", icon: "zwave" },
      { text: "שליטה מרכזית בכל המערכות", icon: "control" },
    ],
    offerings: [
      {
        title: "KNX עם מערכת Control4",
        desc: "הסטנדרט העולמי לווילאות ופרויקטי יוקרה. תשתית קווית אמינה בתקן KNX, עטופה בממשק השליטה האלגנטי של Control4. תאורה, אקלים, אודיו ואבטחה — הכל מסונכרן במסך מגע אחד.",
        image: IMAGES.services.smartKnx,
        imageAlt: "מסך מגע חכם לשליטת אקלים על קיר בחדר שינה",
        imageFit: "cover",
      },
      {
        title: "Palwintec · Zigbee",
        desc: "מפסקי מגע מעוצבים ויוקרתיים מבית Palwintec, הפועלים על רשת Zigbee אלחוטית חכמה. פתרון גמיש ויציב המשתלב בשלמות עם עיצוב הפנים של הבית.",
        image: IMAGES.services.smartPalwintec,
        imageAlt: "לוח שליטה עגול עם מסך מגע על קיר בסלון מודרני",
        imageFit: "cover",
      },
      {
        title: "Domex · Z‑Wave",
        desc: "הפתרון המושלם לשדרוג בתים קיימים ללא שבירת קירות. ציוד הקצה של Domex מבוסס תדר Z‑Wave, היוצר רשת Mesh אלחוטית, עצמאית וחזקה במיוחד שמכסה כל פינה בנכס.",
        image: IMAGES.services.smartDomex,
        imageAlt: "מתג Domex שחור עם נוריות חיווי על קיר מחוספס בסלון יוקרתי",
        imageFit: "cover",
      },
    ],
    audience: "לבתים ולעסקים שרוצים שליטה מלאה, נוחות יומיומית וטכנולוגיה שעובדת בשקט.",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getOtherServices(slug: ServiceSlug): Service[] {
  return SERVICES.filter((s) => s.slug !== slug);
}
