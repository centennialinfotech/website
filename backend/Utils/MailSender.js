const nodemailer = require("nodemailer");

const nodemamailSender = async (email, title, body) => {
  console.log("Sending email to:", email);
  console.log("Subject:", title);

  try {
    const user = process.env.MAIL_USER;
    const pass = process.env.MAIL_PASS;

    if (!user || !pass) {
      console.error("MAIL_USER or MAIL_PASS is not set. Skipping email send.");
      return null;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user,
        pass, // Gmail App Password
      },
      // Looser TLS + timeouts to avoid hanging
      tls: { rejectUnauthorized: false },
      connectionTimeout: 20000,
      socketTimeout: 20000,
    });

    const info = await transporter.sendMail({
      from: `Centennial <${user}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Mail sent:", info.response || info);
    return info;
  } catch (err) {
    console.error("Error sending mail (non‑fatal):", err.message || err);
    // IMPORTANT: do NOT throw, so API still responds 200 and DB save is not rolled back
    return null;
  }
};

module.exports = nodemamailSender;
