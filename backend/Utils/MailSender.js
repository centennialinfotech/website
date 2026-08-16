const nodemailer = require("nodemailer");

const nodemamailSender = async (email, title, body) => {
  console.log("Sending email to:", email);
  console.log("Subject:", title);
  console.log("Body:", body);

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // STARTTLS
      requireTLS: true,

      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },

      // LOCAL DEVELOPMENT ONLY
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Test SMTP connection before sending
    await transporter.verify();
    console.log("SMTP connection successful");

    const info = await transporter.sendMail({
      from: `Centennial <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Mail sent successfully:", info.messageId);

    return info;
  } catch (err) {
    console.error("Error sending mail:", err);
    throw err;
  }
};

module.exports = nodemamailSender;
