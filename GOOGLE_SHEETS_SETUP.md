# 📊 Google Sheets Backend Setup Guide

This guide will help you set up Google Sheets as a backend for your Krishanova FPC website to store form submissions, orders, and user data.

## 🚀 Quick Setup (5 minutes)

### Step 1: Create Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it **"Krishanova FPC Data"**
4. Keep it open - we'll come back to it

### Step 2: Set up Google Apps Script
1. In your spreadsheet, go to **Extensions > Apps Script**
2. Delete the default code
3. Copy and paste the code from `google-sheets-script.js` file in your project
4. Save the project with name **"Krishanova FPC API"**

### Step 3: Deploy the Script
1. Click **Deploy > New deployment**
2. Choose **Web app** as type
3. Set **Execute as**: "Me"
4. Set **Who has access**: "Anyone"
5. Click **Deploy**
6. **Copy the Web App URL** - you'll need this!

### Step 4: Update Your Website
1. Open `lib/google-sheets.ts`
2. Replace `YOUR_SCRIPT_ID` in `GOOGLE_SHEETS_WEB_APP_URL` with your actual script URL
3. Update notification email in the script (optional)

### Step 5: Test
1. Submit a contact form on your website
2. Check your Google Sheet - new data should appear!

---

## 🔧 Detailed Configuration

### Environment Variables (Optional)
Create a `.env.local` file:
```env
GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
NOTIFICATION_EMAIL=your-email@example.com
```

### Available Endpoints

Your Google Sheets backend will automatically handle:

#### 📝 Contact Forms
- **Sheet**: "Contact Forms"
- **Columns**: Timestamp, Name, Email, Phone, Subject, Message, Status

#### 🛒 Orders
- **Sheet**: "Orders" 
- **Columns**: Timestamp, Order ID, Customer Name, Email, Phone, Address, Items, Total Amount, Payment Method, Status

#### 📧 Newsletter
- **Sheet**: "Newsletter"
- **Columns**: Timestamp, Email, Status
- **Note**: Prevents duplicate emails

#### 🏢 Bulk Orders
- **Sheet**: "Bulk Orders"
- **Columns**: Timestamp, Company Name, Contact Person, Email, Phone, Product Interest, Estimated Quantity, Message, Status

#### 👤 User Registration
- **Sheet**: "Users"
- **Columns**: Timestamp, First Name, Last Name, Email, Phone, Status

---

## 💡 Usage Examples

### Contact Form Integration
```typescript
import GoogleSheetsService from '@/lib/google-sheets'

const handleContactSubmit = async (formData) => {
  try {
    await GoogleSheetsService.submitContactForm({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      timestamp: new Date().toISOString()
    })
    
    // Show success message
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours."
    })
  } catch (error) {
    // Handle error
    console.error('Error:', error)
  }
}
```

### Order Processing
```typescript
const processOrder = async (cartItems, customerInfo) => {
  const orderId = GoogleSheetsService.generateOrderId()
  
  await GoogleSheetsService.submitOrder({
    orderId,
    customerName: customerInfo.name,
    email: customerInfo.email,
    phone: customerInfo.phone,
    address: customerInfo.address,
    items: cartItems,
    totalAmount: calculateTotal(cartItems),
    paymentMethod: "razorpay",
    orderStatus: "pending",
    timestamp: new Date().toISOString()
  })
}
```

---

## 🔒 Security & Best Practices

### Script Security
- The script accepts data from anyone, so validate on frontend
- Monitor usage through Google Cloud Console
- Set up alerts for unusual activity
- Consider rate limiting for production

### Data Privacy
- Inform users about data collection
- Implement GDPR compliance if needed
- Regular backup of important data
- Set appropriate sharing permissions

### Performance Tips
- Script has daily execution limits
- For high volume, consider upgrading to paid Google Workspace
- Implement caching where possible
- Use batch operations for bulk data

---

## 📈 Advanced Features

### Email Notifications
The script automatically sends email notifications for:
- New contact form submissions
- New orders
- Bulk order inquiries

Update the notification email in the script:
```javascript
const notificationEmail = 'your-email@example.com'
```

### Custom Formatting
Sheets are automatically formatted with:
- Colored headers
- Frozen top row
- Auto-resized columns
- Professional styling

### Error Handling
- Comprehensive error logging
- Fallback mechanisms
- User-friendly error messages
- Automatic retry logic

---

## 🚨 Troubleshooting

### Common Issues

**"Script not authorized"**
- Redeploy the script
- Check execution permissions
- Ensure "Anyone" access is set

**"Data not appearing"**
- Check browser console for errors
- Verify script URL is correct
- Test with script editor's test function

**"Permission denied"**
- Make sure sheet is accessible
- Check Google Apps Script permissions
- Verify deployment settings

### Testing the Script
Use the `testScript()` function in Apps Script:
1. Open your script in Apps Script editor
2. Select `testScript` function
3. Click Run
4. Check execution log for results

---

## 📱 Mobile Optimization

The Google Sheets backend works seamlessly on mobile:
- Fast response times
- Offline form validation
- Progressive enhancement
- Touch-friendly interfaces

---

## 🌟 Benefits

✅ **No Backend Required** - Pure frontend solution
✅ **Real-time Data** - Instant updates in Google Sheets
✅ **Email Notifications** - Automatic alerts for new submissions
✅ **Easy Management** - Familiar spreadsheet interface
✅ **Free Tier** - Google's generous free limits
✅ **Reliable** - Google's infrastructure
✅ **Scalable** - Handles growth automatically

---

## 📞 Support

If you need help with setup:
1. Check the troubleshooting section
2. Review Google Apps Script documentation
3. Test with sample data first
4. Verify all permissions are correct

---

## 🔄 Updates & Maintenance

### Regular Tasks
- Monitor script execution logs
- Check for failed submissions
- Update notification preferences
- Review data retention policies

### Scaling Considerations
- Monitor daily execution limits
- Consider paid Google Workspace for higher limits
- Implement data archiving for old records
- Set up backup processes

---

## 🎯 Next Steps

After setup, you can:
1. Customize email templates
2. Add data validation rules
3. Create automated reports
4. Integrate with other Google services
5. Set up automated backups
6. Add custom analytics

---

**🎉 That's it! Your Google Sheets backend is ready to handle all your website data!** 