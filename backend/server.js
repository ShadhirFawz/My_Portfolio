import dotenv from "dotenv";
import express from "express";
import { createTransport } from "nodemailer";
import cors from "cors";

dotenv.config();  // Loading environment variables from .env file

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());  // Use express.json() instead of bodyParser.json()

app.post("/send-email", async (req, res) => {
    const { subject, email, message } = req.body;

    if (!email || !subject || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const transporter = createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,  // Always your email
            replyTo: email,  // This is the user's email entered in the form
            to: process.env.RECEIVER_EMAIL,  // You receive the email
            subject: subject,
            text: `From: ${email}\n\n${message}`,
        };

        // Sending the email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error(error);  // Log error for debugging
        res.status(500).json({ error: "Failed to send email, please try again later" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));