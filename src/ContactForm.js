import { useState } from "react";

const ContactForm = () => {
    const [formData, setFormData] = useState({ subject: "", email: "", message: "" });
    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
            try {
                const response = await fetch("https://my-portfolio-2wy5.vercel.app/send-email", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    mode: "cors", // Explicitly enable CORS
                    credentials: "include", // If using credentials
                    body: JSON.stringify(formData),
                });

                if (!response.ok) throw new Error("Failed to send");
                    
                const data = await response.json();
                setResponseMessage(data.message || "Message sent successfully!");
                setFormData({ subject: "", email: "", message: "" });
                
            } catch (error) {
                console.error("Detailed error:", error);
                setResponseMessage(error.message || "Error sending message. Try again later.");
            }
        };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-gray-800 p-6 rounded-lg">
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="p-2 rounded"/>
            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required className="p-2 rounded"/>
            <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required className="p-2 rounded"/>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Send Message</button>
            {responseMessage && <p className="text-white">{responseMessage}</p>}
        </form>
    );
};

export default ContactForm;
