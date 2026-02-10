const nodemailer = require("nodemailer");

const nodemamailSender = async (email, title, body) => {
  console.log("Sending email to:", email);
  console.log("Subject:", title);
  console.log("Body:", body);
  
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER, // your gmail
        pass: process.env.MAIL_PASS, // Gmail App Password
      },
    });

    let info = await transporter.sendMail({
      from: `Centennial <${process.env.MAIL_USER}>`, // Ensure this is a valid email address
      to: email,
      subject: title,
      html: body,
    });

    console.log("Mail sent:", info);
    return info;

  } catch (err) {
    console.error("Error sending mail:", err);
    throw err; // Optional: re-throw the error if you want to handle it further up the call stack
  }
};

module.exports = nodemamailSender;
