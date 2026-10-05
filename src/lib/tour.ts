export type TourStopId =
  | "overview"
  | "entrance"
  | "living"
  | "media"
  | "rack"
  | "control"
  | "pool";

export type TourHotspot = {
  id: string;
  stopId: TourStopId;
  title: string;
  body: string;
  href: string;
  position: [number, number, number];
};

export type TourStop = {
  id: TourStopId;
  label: string;
  eyebrow: string;
  summary: string;
  position: [number, number, number];
  target: [number, number, number];
};

export const TOUR_STOPS: TourStop[] = [
  {
    id: "overview",
    label: "מבט על",
    eyebrow: "וילה יוקרתית",
    summary:
      "סיור בווילה מודרנית מציאותית — גררו לעיון, עברו בין נקודות, ולחצו על הסמנים למידע על המערכות.",
    position: [9.5, 6.2, 11.5],
    target: [0.5, 1.4, 1],
  },
  {
    id: "entrance",
    label: "כניסה",
    eyebrow: "אבטחה ובקרת גישה",
    summary:
      "כניסה אלגנטית עם אינטרקום זכוכית על קיר אבן — אבטחה שמרגישה כמו עיצוב, לא כמו מפעל.",
    position: [-5.4, 1.7, 6.8],
    target: [-5.4, 1.45, 0.8],
  },
  {
    id: "living",
    label: "סלון",
    eyebrow: "חלל מחיה",
    summary:
      "סלון פתוח עם זכוכית רצפה־תקרה לבריכה — טכנולוגיה שנעלמת בעיצוב היוקרתי.",
    position: [3.4, 1.75, 6.4],
    target: [0.6, 1.35, -0.8],
  },
  {
    id: "media",
    label: "אודיו־וידאו",
    eyebrow: "בידור אדריכלי",
    summary:
      "קיר מדיה עם מסך ורמקולים שקועים בתקרה — חוויית בידור בלי לפגוע בעיצוב.",
    position: [1.4, 1.6, 4.2],
    target: [0.3, 1.6, -3.6],
  },
  {
    id: "rack",
    label: "תקשורת",
    eyebrow: "ארון רשת",
    summary:
      "ארון תקשורת נקי ומסודר — העמוד השדרה השקוף של כל המערכות בנכס.",
    position: [6.8, 1.6, 1.4],
    target: [8.55, 1.4, 1.4],
  },
  {
    id: "control",
    label: "שליטה",
    eyebrow: "בית חכם",
    summary:
      "מסך מגע שקוע בקיר — המוח שמחבר תאורה, אקלים, אבטחה ו־AV.",
    position: [-2.2, 1.6, 2.6],
    target: [-4.1, 1.45, 0.7],
  },
  {
    id: "pool",
    label: "בריכה",
    eyebrow: "חוץ יוקרתי",
    summary:
      "מרפסת ובריכה עם מבט חזרה לסלון — אינטגרציה מלאה בין פנים לחוץ.",
    position: [1.2, 1.9, 13.2],
    target: [0.8, 1.4, 4],
  },
];

export const TOUR_HOTSPOTS: TourHotspot[] = [
  {
    id: "hs-security",
    stopId: "entrance",
    title: "מערכות אבטחה",
    body: "אינטרקום זכוכית, בקרת גישה ומצלמות אלגנטיות בכניסה לווילה.",
    href: "/services/security",
    position: [-5.15, 1.45, 0.55],
  },
  {
    id: "hs-av",
    stopId: "media",
    title: "אודיו־וידאו",
    body: "רמקולים אדריכליים שקועים ומסך שמשתלב בעיצוב הסלון.",
    href: "/services/av",
    position: [0.3, 2.65, -3.45],
  },
  {
    id: "hs-network",
    stopId: "rack",
    title: "מערכות תקשורת",
    body: "ארון תקשורת מסודר עם חיווט מוקפד וסטנדרט הייטק.",
    href: "/services/networking",
    position: [8.4, 1.55, 1.4],
  },
  {
    id: "hs-smart",
    stopId: "control",
    title: "חשמל ובית חכם",
    body: "מסך שליטה מרכזי — KNX עם Control4, Zigbee ו־Z‑Wave.",
    href: "/services/smart-home",
    position: [-4.05, 1.45, 0.7],
  },
];

export function getTourStop(id: TourStopId) {
  return TOUR_STOPS.find((s) => s.id === id) ?? TOUR_STOPS[0];
}
