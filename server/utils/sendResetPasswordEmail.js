const sendEmail = require('./sendEmail');
require('dotenv').config();

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
    const resetURL = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password?token=${token}&email=${email}`;
    const message = `<p>Please reset password by clicking on the following link:
    <a href="${resetURL}" target='_blank'>Reset Password</a></p>`

    return sendEmail({
        to:email,
        subject:'Reset Password',
        html:`<h4>Hello ${name},</h4><br>
        ${message}`
    });
};
module.exports=sendResetPasswordEmail;