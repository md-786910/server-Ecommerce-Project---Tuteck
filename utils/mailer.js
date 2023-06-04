const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMail = async (email, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USERNAME, // Sender address
      to: email, // List of recipients
      subject: subject, // Subject line
      html: text, // Plain text body
    };
    const info = await transport.sendMail(mailOptions);
    return info;
  } catch (error) {
    return new Error("Error sending message");
  }
};

module.exports = sendMail;
