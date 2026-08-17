const { Resend } = require("resend");

const nodemamailSender = async (email, title, body) => {
  console.log("Sending email to:", email);
  console.log("Subject:", title);

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: "Centennial Infotech <onboarding@resend.dev>",
      to: email,
      subject: title,
      html: body,
    });

    if (error) {
      console.error("Error sending mail:", error);
      throw new Error(error.message);
    }

    console.log("Mail sent successfully:", data.id);
    return data;
  } catch (err) {
    console.error("Error sending mail:", err);
    throw err;
  }
};

module.exports = nodemamailSender;
