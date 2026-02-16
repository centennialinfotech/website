const axios = require("axios");

/**
 * Send email using Resend or Brevo API (HTTP-based, works on Render)
 * Priority: Resend > Brevo
 * Throws error if all providers fail or none are configured
 */
const nodemamailSender = async (email, title, body) => {
  console.log("Sending email to:", email);
  console.log("Subject:", title);

  const fromEmail =
    process.env.MAIL_FROM_EMAIL || process.env.MAIL_USER || "centennialinfotech@gmail.com";
  const fromName = process.env.MAIL_FROM_NAME || "Centennial";

  // =====================================================
  // 1️⃣ Try Resend First (If API key exists)
  // =====================================================
  if (process.env.RESEND_API_KEY) {
    try {
      const response = await axios.post(
        "https://api.resend.com/emails",
        {
          from: `${fromName} <${fromEmail}>`,
          to: [email],
          subject: title,
          html: body,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 15000, // 15 seconds timeout
        }
      );

      console.log("✅ Email sent via Resend successfully:", response.data?.id);
      return {
        success: true,
        provider: "resend",
        id: response.data?.id,
      };
    } catch (error) {
      console.error(
        "❌ Resend Error:",
        error.response?.data || error.message
      );
      // Continue to try Brevo if Resend fails
    }
  }

  // =====================================================
  // 2️⃣ Try Brevo (If API key exists)
  // =====================================================
  if (process.env.BREVO_API_KEY) {
    try {
      const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: {
            name: fromName,
            email: fromEmail,
          },
          to: [{ email }],
          subject: title,
          htmlContent: body,
        },
        {
          headers: {
            "api-key": process.env.BREVO_API_KEY,
            "Content-Type": "application/json",
          },
          timeout: 15000, // 15 seconds timeout
        }
      );

      console.log("✅ Email sent via Brevo successfully:", response.data?.messageId);
      return {
        success: true,
        provider: "brevo",
        id: response.data?.messageId,
      };
    } catch (error) {
      console.error(
        "❌ Brevo Error:",
        error.response?.data || error.message
      );
      // If both Resend and Brevo failed, throw error
      if (process.env.RESEND_API_KEY) {
        // Resend was tried and failed, now Brevo failed too
        throw new Error(`Both Resend and Brevo failed. Last error: ${error.response?.data?.message || error.message}`);
      }
      // Only Brevo was configured and it failed
      throw new Error(`Brevo email send failed: ${error.response?.data?.message || error.message}`);
    }
  }

  // =====================================================
  // 3️⃣ No email provider configured
  // =====================================================
  const errorMsg = "No email provider configured. Set RESEND_API_KEY or BREVO_API_KEY environment variable.";
  console.error("❌", errorMsg);
  throw new Error(errorMsg);
};

module.exports = nodemamailSender;
