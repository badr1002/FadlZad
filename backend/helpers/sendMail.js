const nodemailer = require("nodemailer");
const smtpTransport = require('nodemailer-smtp-transport');

let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
        user: process.env.Email,
        pass: process.env.MailPassword
    }
}))


module.exports = {
    sendMail: async (mailOptions) => {
        try {
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err);
                }
                console.log('Email sent: ' + info.response);
            })

        } catch (err) {
            throw new Error('email not sent')
        }
    },
    // sendSMS: async () => {
    //   try {
    //       const accountSid = 'AC30a4a7f79deed7e6621b3a676890b028';
    //       const authToken = '[AuthToken]';
    //       const client = require('twilio')(accountSid, authToken);

    //       await client.messages
    //           .create({
    //               body: 'hello badr',
    //               messagingServiceSid: 'MGa798163f94fb6ab350342629144da496',
    //               to: '+01110334675'
    //           })
    //           .then(message => console.log(message.sid))
    //           .done()
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    sendMailerToSetNewPassword: async (id, email) => {
        let mailOptions = {
            from: `FadlZ <${process.env.Email}>`,
            to: email,
            subject: 'change password',
            text: 'set new password copy this code',
            html: `<p>Set new password use this code <h1 style="color:blue">${id}</h1> to change password</p>`
        }
        try {
            await module.exports.sendMail(mailOptions)
        } catch (err) {
            throw new Error('email not sent')
        }
    },
    sendMailToActiveAcoount: async (key, email) => {
        let mailOptions = {
            from: `Fadel Zad <${process.env.Email}>`,
            to: email,
            subject: 'activate your account',
            text: 'activate your account open this link',
            html: `<p>Click <a href="${process.env.backUrl}/api/auth/active/${key}">here</a> to active your acount</p>`
        }
        try {
            await module.exports.sendMail(mailOptions)
        } catch (err) {
            throw new Error('email not sent')
        }
    },
    sendMailCaontactUs: async (name, email, sub, messageInfo) => {
        let mailOptions = {
            from: `${name}`,
            to: `Badr <${process.env.Email}>`,
            subject: `${sub} from ${email}`,
            text: `New contact message!`,
            html: `<html><p>${messageInfo}</p></html>`
        };
        try {
            await module.exports.sendMail(mailOptions)
        } catch (err) {
            throw new Error('email not sent')
        }
    }
}
