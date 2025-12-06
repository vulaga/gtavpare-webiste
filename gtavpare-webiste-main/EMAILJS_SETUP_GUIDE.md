# EmailJS Setup Guide

This guide will help you set up EmailJS to receive customer information via email.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account
2. The free plan allows 200 emails per month, which should be sufficient for starting out

## Step 2: Add an Email Service

1. After logging in, go to "Email Services" in the dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Note down the "Service ID" (you'll need this later)

## Step 3: Create an Email Template

1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. In the template editor, click on the "HTML" tab to switch to HTML mode
4. Copy and paste the entire HTML code from the `email_template.html` file we created
5. Make sure the template variables match the ones in your code:
   - `{{from_name}}` - Customer's account
   - `{{launcher_type}}` - Selected launcher
   - `{{game_version}}` - Game version (Legacy or Enhanced)
   - `{{money_amount}}` - GTA$ amount (if selected)
   - `{{rank_level}}` - Rank boost level (if selected)
   - `{{payment_method}}` - Payment method
   - `{{total_price}}` - Total price
   - `{{payment_proof}}` - Payment proof text
   - `{{image_url}}` - Link to payment screenshot
6. Save the template and note down the "Template ID"

## Step 4: Get Your Public Key

1. Go to "Account" in the dashboard
2. Find your "Public Key" and copy it

## Step 5: Update Your Code

1. Open `index.html` in your code editor
2. Replace `YOUR_EMAILJS_PUBLIC_KEY` with your actual public key
3. Replace `YOUR_EMAILJS_SERVICE_ID` with your service ID
4. Replace `YOUR_EMAILJS_TEMPLATE_ID` with your template ID

## Step 6: Test Your Setup

1. Open your website
2. Fill out the form and submit
3. Check your email to see if you received the customer information

## Troubleshooting

If you encounter issues:

1. Check the browser console for error messages
2. Make sure all your EmailJS credentials are correct
3. Verify that your email service is properly connected
4. Check if your template variables match the ones in your code
5. If the email is received but the styling is broken, make sure your email client supports HTML emails

## Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Templates Guide](https://www.emailjs.com/docs/templates/)
- [EmailJS Support](https://www.emailjs.com/support/) 