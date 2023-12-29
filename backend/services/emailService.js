const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {
    // Konfiguracja transportera
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_EMAIL, // Adres email wysyłający
        pass: process.env.EMAIL_PASSWORD, // Hasło do adresu email wysyłającego
      },
    });

    // Utwórz opcje dla wiadomości
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to,
      subject,
      html,
    };

    // Wyślij email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { sendEmail };
