const nodemailer = require("nodemailer");

const nodemamailSender = async (email, title, body) => {
  console.log("Sending email to:", email);
  console.log("Subject:", title);

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,

      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },

      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();

    console.log("SMTP connection successful");

    const info = await transporter.sendMail({
      from: `"Centennial Infotech" <${process.env.MAIL_USER}>`,
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
