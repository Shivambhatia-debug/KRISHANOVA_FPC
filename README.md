# Krishanova FPC - Premium Makhana E-commerce Platform

![Krishanova FPC Hero Image](public/images/hero-1.jpg)

Welcome to the official repository for the Krishanova FPC e-commerce website. This is a full-featured, modern web application built with Next.js and TypeScript, designed to showcase and sell premium makhana (fox nuts) and other healthy snacks.

## ✨ Features

- **Modern Tech Stack**: Built with Next.js 14 (App Router), React, and TypeScript.
- **Beautiful UI**: Styled with Tailwind CSS and Shadcn/UI for a clean, responsive, and accessible user interface.
- **Headless Backend**: Uses Google Sheets as a simple, free, and effective backend for managing orders, contact form submissions, and newsletter signups.
- **Fully Responsive**: Looks and works great on all devices, from mobile phones to desktops.
- **Performance Optimized**: Fast page loads with Next.js server-side rendering and image optimization.
- **Interactive Components**: Features include a shopping cart, product quick view, search functionality, and client-side form validation.
- **Easy to Deploy**: Ready to be deployed on platforms like Vercel or Netlify.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later)
- pnpm (or npm/yarn)
- A Google Account

### 1. Clone the Repository

```bash
git clone https://github.com/Shivambhatia-debug/KRISHANOVA_FPC.git
cd KRISHANOVA_FPC
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up the Google Sheets Backend

This project uses a Google Apps Script to connect to a Google Sheet, which acts as a database.

1.  **Create a Google Sheet**:
    -   Go to [Google Sheets](https://sheets.google.com) and create a new, blank spreadsheet.
    -   You can name it anything (e.g., "Krishanova FPC Data").
    -   From the URL, copy the **Spreadsheet ID**. It's the long string of characters between `/d/` and `/edit`.
        -   `https://docs.google.com/spreadsheets/d/`**`[YOUR_SPREADSHEET_ID]`**`/edit`

2.  **Create the Google Apps Script**:
    -   In your new spreadsheet, go to **Extensions > Apps Script**.
    -   Delete any default code in the editor.
    -   Copy the entire content of the `google-sheets-script.js` file from this project and paste it into the Apps Script editor.
    -   Find the `SPREADSHEET_ID` variable at the top of the script and paste your Spreadsheet ID into the quotes.
    -   Optionally, update the `ADMIN_EMAIL` variable to receive email notifications for new orders and submissions.
    -   Save the script project (e.g., "Krishanova API").

3.  **Deploy the Script**:
    -   In the Apps Script editor, click **Deploy > New deployment**.
    -   For "Select type", click the gear icon and choose **Web app**.
    -   Set **Execute as** to **"Me"**.
    -   Set **Who has access** to **"Anyone"**. This is crucial for the website to be able to send data.
    -   Click **Deploy**.
    -   **Authorize access** when prompted.
    -   After deployment, copy the **Web app URL**.

4.  **Connect the Frontend**:
    -   In your local project, open the `lib/google-sheets.ts` file.
    -   Find the `GOOGLE_SHEETS_WEB_APP_URL` variable.
    -   Paste the **Web app URL** you just copied into the quotes.

### 4. Run the Development Server

Now you're ready to start the local development server.

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## ⚙️ How It Works

-   **Frontend**: A Next.js application serves the UI to users. When a user submits a form (e.g., contact, bulk order), the frontend makes a `fetch` request.
-   **API (Google Apps Script)**: The `fetch` request is sent to the deployed Google Apps Script Web App URL. The `doPost` function in the script parses the request.
-   **Backend (Google Sheets)**: The script then accesses the designated Google Sheet, finds the correct tab (or creates it), and appends the new data as a new row.

This setup provides a robust and free "serverless" backend, perfect for projects of this scale.

## 🙏 Acknowledgements

-   [Shadcn/UI](https://ui.shadcn.com/) for the fantastic UI components.
-   [Vercel](https://vercel.com/) for the powerful Next.js framework.
-   [Google Apps Script](https://developers.google.com/apps-script) for making the simple backend possible.
