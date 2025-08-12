import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('User:', process.env.EMAIL_USER);
console.log('Password length:', process.env.EMAIL_PASS?.length);


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS 
    }
});

export default transporter;
