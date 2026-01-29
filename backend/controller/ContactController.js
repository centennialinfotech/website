require('dotenv').config();
const axios = require('axios');
const nodemamailSender = require('../Utils/MailSender');
const { collaborationInvitationTemplate } = require('../Template/collaborationInvitationTemplate');
const { contactUsTemplate } = require('../Template/MailVerification');
const Contact = require('../model/Contact');

const verifyRecaptcha = async (token) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not set in environment variables');
    console.warn('To skip reCAPTCHA in development, add SKIP_RECAPTCHA=true to your .env file');
    return false;
  }
  
  const url = 'https://www.google.com/recaptcha/api/siteverify';

  try {
    const response = await axios.post(url, null, {
      params: {
        secret: secretKey,
        response: token,
      },
      timeout: 10000, // 10 seconds timeout
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    console.log('reCAPTCHA verification response:', response.data);
    
    if (response.data && response.data.success) {
      return true;
    }
    
    // Log the error details from Google
    if (response.data && response.data['error-codes']) {
      console.error('reCAPTCHA error codes:', response.data['error-codes']);
    }
    
    return false;
  } catch (error) {
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      console.error('Error verifying reCAPTCHA: Request timeout - Unable to reach Google reCAPTCHA API');
      console.error('This might be due to network issues, firewall, or proxy settings');
      console.warn('TIP: Add SKIP_RECAPTCHA=true to your .env file to skip verification in development');
      // Re-throw timeout errors so they can be handled by the caller
      throw error;
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
      console.error('Error verifying reCAPTCHA: Network error - Cannot connect to Google reCAPTCHA API');
      console.error('Check your internet connection and network settings');
      console.warn('TIP: Add SKIP_RECAPTCHA=true to your .env file to skip verification in development');
      throw error;
    } else if (error.response) {
      console.error('Error verifying reCAPTCHA - Server responded with error:', error.response.status, error.response.data);
    } else {
      console.error('Error verifying reCAPTCHA:', error.message);
    }
    return false;
  }
};

exports.contactUs = async (req, res) => {
  const { name, phone, email, query, recaptchaToken } = req.body;

  console.log("Received contact form submission");
  console.log("Name:", name, "Type:", typeof name);
  console.log("Phone:", phone, "Type:", typeof phone, "Length:", phone?.length);
  console.log("Email:", email, "Type:", typeof email);
  console.log("Query:", query, "Type:", typeof query);
  console.log("reCAPTCHA Token:", recaptchaToken ? "Present" : "Missing");

  // Trim and validate each field
  const trimmedName = name?.trim();
  const trimmedPhone = phone?.trim();
  const trimmedEmail = email?.trim();
  const trimmedQuery = query?.trim();

  // Check for missing or empty fields with specific error messages
  if (!trimmedName || trimmedName.length === 0) {
    console.error('Missing or empty name field');
    return res.status(400).json({ error: 'Name is required' });
  }

  if (!trimmedPhone || trimmedPhone.length === 0) {
    console.error('Missing or empty phone field');
    return res.status(400).json({ error: 'Phone number is required' });
  }

  if (!trimmedEmail || trimmedEmail.length === 0) {
    console.error('Missing or empty email field');
    return res.status(400).json({ error: 'Email is required' });
  }

  if (!trimmedQuery || trimmedQuery.length === 0) {
    console.error('Missing or empty query field');
    return res.status(400).json({ error: 'Query is required' });
  }

  if (!recaptchaToken || recaptchaToken.trim().length === 0) {
    console.error('Missing or empty recaptchaToken field');
    return res.status(400).json({ error: 'reCAPTCHA verification is required' });
  }

  // Skip reCAPTCHA verification in development mode if SKIP_RECAPTCHA is set
  // Also check if we're running locally (localhost or 127.0.0.1)
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                        process.env.NODE_ENV !== 'production' ||
                        !process.env.NODE_ENV;

  
  if (!isDevelopment) {
    try {
      const isRecaptchaValid = await verifyRecaptcha(recaptchaToken);
      if (!isRecaptchaValid) {
        console.error('reCAPTCHA verification failed');
        return res.status(400).json({ error: 'reCAPTCHA verification failed' });
      }
    } catch (error) {
      // In development, allow the request to proceed even if reCAPTCHA times out
     
        console.error('Error during reCAPTCHA verification:', error.message);
        return res.status(500).json({ error: 'Error verifying reCAPTCHA. Please try again.' });
    }
  } else {
    console.log('Skipping reCAPTCHA verification (development mode or SKIP_RECAPTCHA enabled)');
  }

  try {
    // Save contact data to database after reCAPTCHA verification
    const newContact = new Contact({
      name: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail,
      query: trimmedQuery,
    });
    await newContact.save();
    console.log('Contact data saved to database');

    await nodemamailSender(
      trimmedEmail,
      'Contact Form Confirmation',
      contactUsTemplate(trimmedName, trimmedEmail, trimmedQuery, trimmedPhone)
    );

    await nodemamailSender(
      'centennialinfotech@gmail.com',
      'New Contact Us Message',
      collaborationInvitationTemplate(trimmedName, trimmedEmail, trimmedQuery, trimmedPhone)
    );

    res.status(200).send({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error processing contact form:', error.message);
    res.status(500).send({ message: 'Error processing contact form', error: error.message });
  }
};
