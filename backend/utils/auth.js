const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const generateToken = (userId, expiresIn = '15m') => 
  jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn }
  );

const createTransporter = () => 
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

const createMailOptions = (email, token) => ({
  from: process.env.EMAIL_USER,
  to: email,
  subject: 'Magic Link for Login',
  html: `
    <h1>Login to Your Account</h1>
    <p>Click the link below to login (valid for 15 minutes):</p>
    <a href="${process.env.FRONTEND_URL}/verify/${token}">Login to Your Account</a>
    <p>If you didn't request this, please ignore this email.</p>
  `
});

const sendMagicLink = async (email, token) => {
  const transporter = createTransporter();
  const mailOptions = createMailOptions(email, token);

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error('Failed to send magic link email');
  }
};

module.exports = {
  generateToken,
  sendMagicLink
};
