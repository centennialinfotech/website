const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const { dbConnect } = require("../config/DbConnection");
const {
  collaborationInvitationTemplate,
} = require("../Template/collaborationInvitationTemplate");
const { contactUsTemplate } = require("../Template/MailVerification");
const nodemamailSender = require("../Utils/MailSender"); // Adjust the path as necessary
const {
  subscribeTemplate,
  adminSubscribeTemplate,
} = require("../Template/subscribe");
const {
  serviceTemplate,
  adminServiceTemplate,
} = require("../Template/service");
const Blog = require("../routes/Blog");

const serviceRoutes = require("../routes/serviceRoutes");
const productRoutes = require("../routes/productRoutes");
const { authenticate } = require("../middleware/authMiddleware");

const path = require("path");

///login part
const adminRoutes = require("../routes/adminroutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // For parsing application/json

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

// // Connect to MongoDB
dbConnect();

app.use("/v1", Blog);

const verifyRecaptcha = async (token) => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  console.log("DEBUG verifyRecaptcha - Token received:", token);
  console.log("DEBUG verifyRecaptcha - Secret Key loaded:", secretKey ? "Yes, length: " + secretKey.length : "NO");

  if (!secretKey) {
    console.error("RECAPTCHA_SECRET_KEY is missing");
    return false;
  }

  try {
    const params = new URLSearchParams();
    params.append('secret', secretKey);
    params.append('response', token);

    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    console.log("reCAPTCHA verification response:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "reCAPTCHA verification error:",
      error.response?.data || error.message,
    );

    return { success: false, 'error-codes': [error.message] };
  }
};

app.post("/contact-us", async (req, res) => {
  const { name, phone, email, query, recaptchaToken } = req.body;

  console.log("Received contact form submission");
  console.log("Name:", name);
  console.log("Phone:", phone);
  console.log("Email:", email);
  console.log("Query:", query);
  console.log("Has reCAPTCHA:", !!recaptchaToken);

  if (!name || !phone || !email || !query || !recaptchaToken) {
    console.error("Missing required fields");

    return res.status(400).json({
      success: false,
      error: "Missing required fields",
    });
  }

  try {
    // Skip reCAPTCHA check for local development bypass
    if (recaptchaToken !== 'local-bypass') {
      const recaptchaData = await verifyRecaptcha(recaptchaToken);

      if (!recaptchaData.success) {
        console.error("reCAPTCHA verification failed:", recaptchaData['error-codes']);

        return res.status(400).json({
          success: false,
          error: "reCAPTCHA verification failed",
          details: recaptchaData['error-codes']
        });
      }

      console.log("reCAPTCHA verified successfully");
    } else {
      console.log("reCAPTCHA bypassed (local development mode)");
    }
    await nodemamailSender(
      email,
      "Contact Form Confirmation",
      contactUsTemplate(name, email, query, phone),
    );

    console.log("Customer confirmation email sent");

    await nodemamailSender(
      "centennialinfotech@gmail.com",
      "New Contact Us Message",
      collaborationInvitationTemplate(name, email, query, phone),
    );

    console.log("Admin notification email sent");

    return res.status(200).json({
      success: true,
      message: "Emails sent successfully",
    });
  } catch (error) {
    console.error("Error sending emails:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Error sending emails",
    });
  }
});

// 👇 ADD THESE LINES - Serve static files from public directory
// app.use(express.static(path.join(__dirname, '../public')));

// Serve static files from frontend
app.use(express.static(path.join(__dirname, "../../")));

// API Routes
app.use("/api/services", authenticate, serviceRoutes);
app.use("/api/products", authenticate, productRoutes);

// Simple route for public access (no auth)
app.get("/api/public/services", async (req, res) => {
  try {
    const Service = require("../model/Service"); // ✅ FIXED
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/public/products", async (req, res) => {
  try {
    const Product = require("../model/Product"); // ✅ FIXED
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Define email schema and model
const EmailSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  query: String,
});

const Email = mongoose.model("Email", EmailSchema);

// Define newsletter subscription schema and model
const NewsletterSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

const Newsletter = mongoose.model("Newsletter", NewsletterSchema);

// Define comment schema and model
const CommentSchema = new mongoose.Schema({
  text: String,
});

const Comment = mongoose.model("Comment", CommentSchema);

// Handle comment submission
app.post("/comments", async (req, res) => {
  const { text } = req.body;

  try {
    const newComment = new Comment({ text });
    await newComment.save();
    res.status(201).send("Comment added!");
  } catch (error) {
    res.status(500).send("Error adding comment");
  }
});

// Handle retrieving comments
app.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).send("Error retrieving comments");
  }
});

// Add this function to validate email format
// const isValidEmail = (email) => {
//   const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return re.test(String(email).toLowerCase());
// };

// Handle newsletter subscription
app.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  console.log("emails", email);

  if (!isValidEmail(email)) {
    return res.status(400).send("Please enter a valid email address.");
  }

  try {
    const existingEmail = await Newsletter.findOne({ email });

    if (existingEmail) {
      return res.status(400).send("Email is already subscribed.");
    }

    console.log("email", email);

    // Function to send emails
    const sendEmails = async (email) => {
      try {
        await nodemamailSender(
          email,
          "Newsletter Subscription Confirmation",
          subscribeTemplate(email),
        );
        await nodemamailSender(
          email,
          "Newsletter Subscription Confirmation",
          adminSubscribeTemplate(email),
        );
      } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send email");
      }
    };

    // Send emails
    await sendEmails(email);

    const newSubscription = new Newsletter({ email });
    await newSubscription.save();

    res.status(201).send("Subscription successful!");
  } catch (error) {
    console.error("Error subscribing:", error);
    res.status(500).send("Error subscribing");
  }
});

app.get("/unsubscribe", async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send("Invalid request");
  }

  try {
    // Decode token to get email
    const decipher = crypto.createDecipher("aes256", "your-secret-key");
    let email = decipher.update(token, "hex", "utf8");
    email += decipher.final("utf8");

    // Remove subscriber from the database
    const result = await Newsletter.deleteOne({ email: email });

    if (result.deletedCount > 0) {
      res.send("You have been successfully unsubscribed.");
    } else {
      res.status(404).send("Email not found.");
    }
  } catch (error) {
    res.status(500).send("An error occurred.");
  }
});

app.post("/service-submit", async (req, res) => {
  console.log("hii");

  const { fullName, email, phone } = req.body;

  console.log("service", req.body);

  // Server-side validation
  if (!fullName || !isValidEmail(email) || !isValidPhone(phone)) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  // Process the contact data (e.g., save to database, send email notification, etc.)

  await nodemamailSender(
    email,
    "Contact Form Confirmation",
    serviceTemplate(email),
  );

  res.json({ success: true, message: "Request submitted successfully" });
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^\+\d{1,3}\s?\d{1,14}$/;
  return phoneRegex.test(phone);
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
