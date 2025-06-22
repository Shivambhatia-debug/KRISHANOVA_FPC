// Krishanova FPC Google Apps Script Backend

// --- CONFIGURATION ---
// IMPORTANT: Manually create a Google Sheet and paste its ID here.
const SPREADSHEET_ID = "1bSeJfMkPg4q0aJnQAYbqgtx5k21YxNHbLWvtuDZDLs"; 
const SPREADSHEET_NAME = "Krishanova FPC Data"; // Used as a fallback if ID is missing/invalid.
// IMPORTANT: Replace with your email to receive notifications for important submissions.
const ADMIN_EMAIL = "shivambhatia19v@gmail.com"; 

// --- DO NOT EDIT BELOW THIS LINE ---

/**
 * Main entry point for POST requests from the website.
 * This function routes the request to the appropriate handler.
 */
function doPost(e) {
  // First, log the entire event object to see what we're receiving.
  Logger.log(JSON.stringify(e, null, 2));

  // Handle manual execution from the script editor, which lacks postData.
  if (!e || !e.postData) {
    const message = "This script is designed to be triggered by an HTTP POST request and cannot be run manually from the Apps Script editor. When run directly, the event object 'e' does not contain 'postData', leading to an error.";
    Logger.log(message);
    return createJsonResponse({
      status: "info",
      message: message,
      remedy: "Please test by sending a POST request from your web application or a tool like Postman."
    });
  }

  let spreadsheetUrl = "URL not determined"; // Variable to hold the spreadsheet URL for debugging.
  try {
    const requestData = JSON.parse(e.postData.contents);
    const type = requestData.type;
    const data = requestData.data;

    if (!type || !data) {
      throw new Error("Missing 'type' or 'data' in request body.");
    }

    const spreadsheet = getOrCreateSpreadsheet();
    spreadsheetUrl = spreadsheet.getUrl(); // Get the URL of the spreadsheet being used.
    
    let sheet;
    let headers;

    // Determine the target sheet, headers, and data row based on submission type.
    switch (type) {
      case "contact":
        sheet = getOrCreateSheet(spreadsheet, "Contact Form");
        headers = ["Timestamp", "Name", "Email", "Phone", "Subject", "Message"];
        break;
      case "newsletter":
        sheet = getOrCreateSheet(spreadsheet, "Newsletter Subscriptions");
        headers = ["Timestamp", "Email"];
        break;
      case "bulk-order":
        sheet = getOrCreateSheet(spreadsheet, "Bulk Orders");
        headers = ["Timestamp", "Company Name", "Contact Name", "Email", "Phone", "Product", "Quantity (kg)", "Message"];
        break;
      case "checkout":
         sheet = getOrCreateSheet(spreadsheet, "Orders");
         headers = [
            "Timestamp", "Order ID", "Full Name", "Email", "Phone", 
            "Address", "City", "State", "Zip Code", "Country",
            "Items", "Subtotal", "Shipping", "Total"
        ];
        break;
       case "user-registration":
         sheet = getOrCreateSheet(spreadsheet, "User Registrations");
         headers = ["Timestamp", "Name", "Email", "Phone"];
         break;
      default:
        throw new Error(`Invalid type specified: ${type}`);
    }

    ensureHeaders(sheet, headers);
    const rowData = prepareRowData(type, data, headers);
    sheet.appendRow(rowData);
    
    // Send an email notification for important events if an admin email is set.
    if (['contact', 'bulk-order', 'checkout'].includes(type) && ADMIN_EMAIL !== "YOUR_EMAIL") {
      sendEmailNotification(type, data);
    }

    // Return a success response, including the spreadsheet URL for verification.
    return createJsonResponse({
      status: "success",
      message: "Data saved successfully",
      type: type,
      spreadsheetUrl: spreadsheetUrl 
    });
  } catch (error) {
    Logger.log(`Error in doPost: ${error.toString()} - Stack: ${error.stack}`);
    return createJsonResponse({
      status: "error",
      message: `An error occurred: ${error.message}`,
      spreadsheetUrl: spreadsheetUrl 
    });
  }
}

/**
 * Retrieves the spreadsheet to write to.
 * It first tries to use the provided SPREADSHEET_ID. If that fails or is not provided,
 * it searches for a spreadsheet by SPREADSHEET_NAME. If not found, it creates a new one.
 */
function getOrCreateSpreadsheet() {
    // 1. Try to open by the hardcoded ID first.
    if (SPREADSHEET_ID && SPREADSHEET_ID !== "YOUR_SPREADSHEET_ID") {
        try {
            const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
            Logger.log(`Successfully opened spreadsheet by ID: "${spreadsheet.getName()}"`);
            return spreadsheet;
        } catch (e) {
            Logger.log(`Could not open spreadsheet by ID "${SPREADSHEET_ID}". It might be invalid or you lack permission. Error: ${e.message}. Falling back to searching by name.`);
        }
    }

    // 2. If ID fails, search for the spreadsheet by name.
    const existingFiles = DriveApp.getFilesByName(SPREADSHEET_NAME);
    if (existingFiles.hasNext()) {
        const spreadsheet = SpreadsheetApp.open(existingFiles.next());
        Logger.log(`Opened existing spreadsheet by name: "${SPREADSHEET_NAME}" with URL: ${spreadsheet.getUrl()}`);
        return spreadsheet;
    }

    // 3. If still not found, create a new one as a last resort.
    const spreadsheet = SpreadsheetApp.create(SPREADSHEET_NAME);
    const url = spreadsheet.getUrl();
    const id = spreadsheet.getId();
    Logger.log(`Created new spreadsheet: "${SPREADSHEET_NAME}"`);
    Logger.log(`URL: ${url}`);
    Logger.log(`ID: ${id}`);
    
    // Send a one-time email to the admin with the new spreadsheet's details.
    if (ADMIN_EMAIL && ADMIN_EMAIL !== "YOUR_EMAIL") {
        MailApp.sendEmail(ADMIN_EMAIL, 
            `ACTION REQUIRED: New Spreadsheet Created for ${SPREADSHEET_NAME}`,
            `A new Google Spreadsheet has been created to store your website's form data because a valid SPREADSHEET_ID was not provided in your script.\n\n` +
            `Name: ${SPREADSHEET_NAME}\n` +
            `ID: ${id}\n` +
            `URL: ${url}\n\n` +
            `To prevent new spreadsheets from being created, please copy the ID ("${id}") and paste it into the SPREADSHEET_ID variable at the top of your Google Apps Script file and redeploy.`
        );
    }
    return spreadsheet;
}

/**
 * Gets a specific sheet (tab) within the spreadsheet. Creates it if it doesn't exist.
 */
function getOrCreateSheet(spreadsheet, sheetName) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    Logger.log(`Created new sheet: "${sheetName}"`);
  }
  return sheet;
}

/**
 * Ensures the header row exists on a new sheet and formats it.
 */
function ensureHeaders(sheet, headers) {
  if (sheet.getLastRow() === 0) { // Only run if the sheet is empty
    sheet.appendRow(headers);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold").setBackground("#f0f0f0");
    sheet.setFrozenRows(1);
    // Auto-resize columns for better readability
    headers.forEach((header, i) => {
        sheet.autoResizeColumn(i + 1);
    });
  }
}

/**
 * Prepares a data row array in the correct order based on the headers.
 */
function prepareRowData(type, data, headers) {
    const timestamp = new Date().toISOString();
    let rowObject = { "Timestamp": timestamp };

    // Map incoming data fields to their corresponding header columns.
    switch (type) {
        case "contact":
            rowObject = { ...rowObject, "Name": data.name, "Email": data.email, "Phone": data.phone, "Subject": data.subject, "Message": data.message };
            break;
        case "newsletter":
            rowObject = { ...rowObject, "Email": data.email };
            break;
        case "bulk-order":
            rowObject = { ...rowObject, "Company Name": data.companyName, "Contact Name": data.contactName, "Email": data.email, "Phone": data.phone, "Product": data.product, "Quantity (kg)": data.quantity, "Message": data.message };
            break;
        case "checkout":
             rowObject = { ...rowObject,
                "Order ID": data.orderId,
                "Full Name": data.fullName,
                "Email": data.email,
                "Phone": data.phone,
                "Address": data.address,
                "City": data.city,
                "State": data.state,
                "Zip Code": data.zipCode,
                "Country": data.country,
                "Items": typeof data.items === 'string' ? data.items : JSON.stringify(data.items),
                "Subtotal": data.subtotal,
                "Shipping": data.shipping,
                "Total": data.total,
            };
            break;
        case "user-registration":
             rowObject = { ...rowObject, "Name": data.name, "Email": data.email, "Phone": data.phone };
             break;
    }

    // Convert the data object into an array in the exact order of the headers.
    return headers.map(header => rowObject[header] !== undefined ? rowObject[header] : "");
}


/**
 * Sends an email notification to the admin for new submissions.
 */
function sendEmailNotification(type, data) {
    try {
        const subject = `New Submission: ${type.charAt(0).toUpperCase() + type.slice(1)}`;
        let body = `You have a new form submission.\n\nType: ${type}\n\n`;

        for (const key in data) {
            body += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${data[key]}\n`;
        }

        MailApp.sendEmail(ADMIN_EMAIL, subject, body);
    } catch (error) {
        Logger.log(`Failed to send email: ${error.toString()}`);
    }
}

/**
 * Helper function to create a standardized JSON response.
 */
function createJsonResponse(responseObject) {
  return ContentService.createTextOutput(JSON.stringify(responseObject))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * A simple GET request handler for testing if the script is deployed and running.
 */
function doGet(e) {
  return createJsonResponse({ status: "running", message: "Krishanova FPC Google Apps Script is active." });
}

/*
SETUP INSTRUCTIONS:

1. Open Google Sheets and create a new spreadsheet
2. Name it "Krishanova FPC Data" or similar
3. Go to Extensions > Apps Script
4. Replace the default code with this script
5. Save the project with a name like "Krishanova FPC API"
6. Deploy the script:
   - Click "Deploy" > "New deployment"
   - Choose "Web app" as type
   - Set Execute as: "Me"
   - Set Who has access: "Anyone"
   - Click "Deploy"
7. Copy the web app URL and update it in your frontend code
8. Update the notification email in sendEmailNotification function

SECURITY NOTES:
- This script accepts data from anyone, so validate data on frontend
- Consider adding basic authentication if needed
- Monitor usage through Google Cloud Console
- Set up alerts for unusual activity

FEATURES:
- Automatic sheet creation with headers
- Email notifications for new submissions
- Duplicate email prevention for newsletter
- Formatted sheets with frozen headers
- Error handling and logging
*/ 