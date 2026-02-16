const axios = require("axios");
const nodemailer = require("nodemailer");

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
  // if (process.env.BREVO_API_KEY) {
  //   try {
  //     const response = await axios.post(
  //       "https://api.brevo.com/v3/smtp/email",
  //       {
  //         sender: {
  //           name: fromName,
  //           email: fromEmail,
  //         },
  //         to: [{ email }],
  //         subject: title,
  //         htmlContent: body,
  //       },
  //       {
  //         headers: {
  //           "api-key": process.env.BREVO_API_KEY,
  //           "Content-Type": "application/json",
  //         },
  //         timeout: 15000, // 15 seconds timeout
  //       }
  //     );

  //     console.log("✅ Email sent via Brevo successfully:", response.data?.messageId);
  //     return {
  //       success: true,
  //       provider: "brevo",
  //       id: response.data?.messageId,
  //     };
  //   } catch (error) {
  //     console.error(
  //       "❌ Brevo Error:",
  //       error.response?.data || error.message
  //     );
  //     // If both Resend and Brevo failed, throw error
  //     if (process.env.RESEND_API_KEY) {
  //       // Resend was tried and failed, now Brevo failed too
  //       throw new Error(`Both Resend and Brevo failed. Last error: ${error.response?.data?.message || error.message}`);
  //     }
  //     // Only Brevo was configured and it failed
  //     throw new Error(`Brevo email send failed: ${error.response?.data?.message || error.message}`);
  //   }
  // }

  // =====================================================
  // 3️⃣ Try Brevo SMTP (Nodemailer)
  // =====================================================
  if (process.env.MAIL_USER && process.env.BREVO_API_KEY) {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.BREVO_API_KEY,
        },
      });

      await transporter.sendMail({
        from: `${fromName} <${fromEmail}>`,
        to: email,
        subject: title,
        html: body,
      });

      console.log("✅ Email sent via Brevo SMTP");
      return { success: true, provider: "brevo-smtp" };
    } catch (error) {
      console.error("❌ Brevo SMTP failed:", error.message);
      throw new Error("All email providers failed.");
    }
  }

  throw new Error(
    "No email provider configured or all providers failed."
  );
};

module.exports = nodemamailSender;
