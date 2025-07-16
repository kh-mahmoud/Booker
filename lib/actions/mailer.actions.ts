'use server'

import nodemailer from 'nodemailer';



const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'coretech.dev173@gmail.com',
        pass: process.env.GMAIL_ACCESS_PASSWORD
    },
    secure: true,
});


export const sendEmail = async (emailContent:EmailContent,email:string[] | string) => {

    const mailOptions = {
        from: '"Booker" <hello.dev173@gmail.com>',
        to: email,
        subject: emailContent.subject,
        html: emailContent.body
    };

    await new Promise((resolve, reject) => {

    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            reject(error);
        } else {
            console.log("Server is ready to take our messages");
            resolve(success);
        }
    });
    });

    await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
}