/**
 * INOVIX — שמירת פניות מהאתר ל-Google Sheets
 *
 * התקנה קצרה:
 * 1. צרו גיליון חדש ב-Google Sheets
 * 2. Extensions → Apps Script → הדביקו את הקוד הזה
 * 3. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. העתיקו את ה-URL ל-Vercel כ-GOOGLE_SHEETS_WEBHOOK_URL
 */

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("פניות");

    if (!sheet) {
      sheet = ss.insertSheet("פניות");
      sheet.appendRow(["תאריך", "שם", "טלפון", "אימייל", "הודעה"]);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      String(data.name || ""),
      String(data.phone || ""),
      String(data.email || ""),
      String(data.message || ""),
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON,
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, service: "inovix-leads" }),
  ).setMimeType(ContentService.MimeType.JSON);
}
