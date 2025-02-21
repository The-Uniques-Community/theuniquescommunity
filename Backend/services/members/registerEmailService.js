require('dotenv').config();
const transporter = require('../../config/emailConfig');

const sendActivationEmail = async (userEmail, fname) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: 'Welcome to The Uniques Community! 🎉',
        html: `
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to The Uniques Community</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, sans-serif; }
        body { background-color: #f9f9f9; color: #333; }
        .container { max-width: 600px; margin: 20px auto; padding: 24px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); border-top: 8px solid #ca0019; border-radius: 8px; }
        .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #424e53; }
        .header h1 { color: #ca0019; font-size: 24px; margin-bottom: 10px; }
        .header p { font-size: 14px; color: #424e53; }
        .main-content { text-align: center; padding: 20px; background-color: #ca0019; color: white; border-radius: 6px; margin-top: 20px; }
        .main-content h2 { font-size: 20px; font-weight: bold; }
        .main-content p { font-size: 16px; margin-top: 8px; }
        .message-body { padding: 20px 0; color: #424e53; font-size: 16px; line-height: 1.6; }
        .bold { font-weight: bold; color: black; }
        .cta-button { display: inline-block; margin-top: 20px; background-color: #ca0019; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 6px; font-weight: bold; transition: background-color 0.3s; }
        .cta-button:hover { background-color: #a80014; }
        .signature { margin-top: 24px; color: #333; font-size: 14px; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to The Uniques Community! 🎉</h1>
            <p>Unlock exclusive opportunities & resources as our valued member</p>
        </div>
        <div class="main-content">
            <h2>Membership Activated</h2>
            <p>You are now a verified member of The Uniques Community!</p>
        </div>
        <div class="message-body">
            <p>Dear <span class="bold">${fname}</span>,</p>
            <p>We’re thrilled to have you on board! You now have access to the <b>Member Dashboard</b>, where you can update your profile, connect with peers, and explore various opportunities.</p>
            <p>Get started by logging into your dashboard:</p>
            <a href="${process.env.LOGIN_URL}" class="cta-button">Go to Member Dashboard</a>
            <p>If you have any questions, feel free to reach out. Welcome aboard!</p>
        </div>
        <p class="signature">Best regards,</p>
        <p class="signature">The Uniques Community Team</p>
        <div class="footer">
            <p>&copy; 2024 The Uniques Community. All Rights Reserved.</p>
        </div>
    </div>
</body>
</html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Activation email sent successfully');
    } catch (error) {
        console.error('Error sending activation email:', error);
    }
};

module.exports = sendActivationEmail;
