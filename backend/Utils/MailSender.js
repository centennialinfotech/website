const axios = require('axios');

/**
 * Send email using Resend or Brevo API (HTTP-based, works on Render)
 * Priority: Resend > Brevo > Gmail SMTP (fallback for local dev)
 */
const nodemamailSender = async (email, title, body) => {
  console.log("Sending email to:", email);
  console.log("Subject:", title);

  const fromEmail = process.env.MAIL_FROM_EMAIL || process.env.MAIL_USER || 'centennialinfotech@gmail.com';
  const fromName = process.env.MAIL_FROM_NAME || 'Centennial';

  // Try Resend first (simpler, recommended)
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const response = await axios.post(
        'https://api.resend.com/emails',
        {
          from: `${fromName} <${fromEmail}>`,
          to: [email],
          subject: title,
          html: body,
        },
        {
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 15000,
        }
      );

      console.log("Mail sent via Resend successfully:", response.data?.id);
      return { success: true, method: 'resend', id: response.data?.id };
    } catch (err) {
      console.error("Error sending mail via Resend:", err.response?.data || err.message);
      return null;
    }
  }

  // Try Brevo if Resend not configured (more free emails)
  const brevoApiKey = process.env.BREVO_API_KEY;
  if (brevoApiKey) {
    try {
      const response = await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        {
          sender: { name: fromName, email: fromEmail },
          to: [{ email }],
          subject: title,
          htmlContent: body,
        },
        {
          headers: {
            'api-key': brevoApiKey,
            'Content-Type': 'application/json',
          },
          timeout: 15000,
        }
      );

      console.log("Mail sent via Brevo successfully:", response.data?.messageId);
      return { success: true, method: 'brevo', id: response.data?.messageId };
    } catch (err) {
      console.error("Error sending mail via Brevo:", err.response?.data || err.message);
      return null;
    }
  }

  // Fallback to Gmail SMTP for local development (if SendGrid not configured)
  const nodemailer = require("nodemailer");
  const mailUser = process.env.MAIL_USER;
  const mailPass = process.env.MAIL_PASS;

  if (!mailUser || !mailPass) {
    console.error("No email service configured. Set RESEND_API_KEY, BREVO_API_KEY, or MAIL_USER/MAIL_PASS.");
    return null;
  }

  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: mailUser,
        pass: mailPass,
      },
      connectionTimeout: 10000, // 10 seconds
      socketTimeout: 10000,
    });

    let info = await transporter.sendMail({
      from: `${fromName} <${mailUser}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Mail sent via Gmail SMTP (local/dev):", info.messageId);
    return { success: true, method: 'gmail-smtp' };
  } catch (err) {
    console.error("Error sending mail via Gmail SMTP:", err.message || err);
    // Don't throw - return null so contact form still works
    return null;
  }
};

module.exports = nodemamailSender;
