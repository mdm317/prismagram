import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import path from "path";
import jwt from "jsonwebtoken";
dotenv.config({ path: path.resolve(__dirname, ".env") });
const string = `1234567890-=qwertyuiop[]\asdfghjkl;zxcvbnm,./QWERTYUIOP{}ASDFGHJKL:ZXCVBNM<>?`;

export const secretGenerator = (len)=>{
    let str="";
    for (let i = 0; i < len; i++) {
        let idx = Math.floor(Math.random()*string.length);
        str = str + string[idx];
    }
    return str;
}
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENGRID_PASSWORD,
    },
});
export const sendSecretMail = async(email, secret)=>{
    return await transporter.sendMail({
        from: `frethdilem@gmail.com`,
        to: email,
        subject: "🔒Login Secret for Prismagram🔒",
        html: `Hello! Your login secret is <b>${secret}</b>.<br/>Copy paste on the app/website to log in`
    });
}
export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET);