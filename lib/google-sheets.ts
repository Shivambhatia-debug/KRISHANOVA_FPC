// lib/google-sheets.ts

// Google Sheets API integration for storing data
// Using Google Sheets as a simple backend for form submissions and orders

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  timestamp: string
}

interface OrderData {
  orderId: string
  customerName: string
  email: string
  phone: string
  address: string
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
  }>
  totalAmount: number
  paymentMethod: string
  orderStatus: string
  timestamp: string
}

interface NewsletterData {
  email: string
  timestamp: string
}

interface BulkOrderData {
  companyName: string
  contactPerson: string
  email: string
  phone: string
  productInterest: string
  estimatedQuantity: string
  message: string
  timestamp: string
}

interface UserRegistrationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  timestamp: string
}

// Google Sheets Web App URL - Updated deployed script
const GOOGLE_SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/AKfycby96smDHvw7jkozC5deFNzI7oA2OmJhctA0AIklZxlZXhbwJqR2i1Kq7AW38NzYIViV-Q/exec";

export class GoogleSheetsService {
  // Method using Web App (Primary approach)
  private static async sendToWebApp(data: { type: string; data: any }) {
    try {
      const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
        method: 'POST',
        headers: {
          // Using text/plain to avoid CORS preflight issues with Google Apps Script
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(data),
        // No 'no-cors' mode needed if the Apps Script is deployed correctly 
        // to be accessible by 'Anyone' and handles JSON responses.
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error('Error from Google Sheets Web App:', errorBody);
        throw new Error(`Request failed with status ${response.status}. See console for details.`);
      }

      const result = await response.json();
      
      if (result.status === 'error') {
        console.error('Error reported by Google Sheets script:', result.message);
        throw new Error(result.message || 'An unknown error occurred in the script.');
      }
      
      // Log the spreadsheet URL for debugging purposes
      if(result.spreadsheetUrl) {
        console.log(`Data successfully sent. View your sheet at: ${result.spreadsheetUrl}`);
      }

      return result; // Return the full success response from the script
    } catch (error) {
      console.error('Error sending data to Google Sheets Web App:', error);
      throw error;
    }
  }

  static async submitContactForm(formData: Omit<ContactFormData, 'timestamp'>) {
    try {
      // The backend script expects 'type' and 'data' fields.
      return await this.sendToWebApp({
        type: 'contact',
        data: formData
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  }

  static async submitOrder(orderData: OrderData) {
    try {
      return await this.sendToWebApp({
        type: 'checkout', // Matches the backend script's case
        data: orderData
      });
    } catch (error) {
      console.error('Error submitting order:', error);
      throw error;
    }
  }

  static async subscribeNewsletter(email: string) {
    try {
      return await this.sendToWebApp({
        type: 'newsletter',
        data: { email }
      });
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  }

  static async submitBulkOrder(bulkOrderData: BulkOrderData) {
    try {
      return await this.sendToWebApp({
        type: 'bulk-order', // Matches the backend script's case
        data: bulkOrderData
      });
    } catch (error) {
      console.error('Error submitting bulk order:', error);
      throw error;
    }
  }

  static async registerUser(userData: UserRegistrationData) {
    try {
      return await this.sendToWebApp({
        type: 'user-registration', // Matches the backend script's case
        data: userData
      });
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }

  // Generate unique order ID
  static generateOrderId(): string {
    const prefix = 'KFP'
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `${prefix}${timestamp}${random}`
  }
}

export default GoogleSheetsService