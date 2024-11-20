const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();
const sendEmail2Donar = async (toEmail, fundDetails) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAILPASS,
        },
    });

    // // await user.save();
    // // Schedule a task to set otp to null after 3 minutes
    // setTimeout(async () => {
    //   // console.log("setting otp to null")
    //   user.otp = null;
    //   await user.save();
    //   // console.log("done")
    // }, 3 * 60 * 1000); // 3 minutes in milliseconds
    // const ticketDetails = {
    //     user_id: '12345',
    //     train_id: '6633d207da198557b157cdcd',
    //     coach: 'sleeper',
    //     fare: 1500,
    //     booking_time: '2024-05-03T00:05:12.833Z'
    // };

    // Compose email message
    let mailOptions = {
        from: process.env.MAIL,
        to: toEmail, // Recipient's email address
        subject: 'Funds Successfully Donated',
        html: `
            <h1>You have successfully donated ${fundDetails.amount} to  ${fundDetails.title}. </h1>
            <p><strong>Total Funds Collected:</strong> ${fundDetails.currentAmount}`
    };


    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });

    return info;
}

const sendEmail2Owner = async (toEmail, fundDetails) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.MAIL,
            pass: process.env.MAILPASS,
        },
    });

    // // await user.save();
    // // Schedule a task to set otp to null after 3 minutes
    // setTimeout(async () => {
    //   // console.log("setting otp to null")
    //   user.otp = null;
    //   await user.save();
    //   // console.log("done")
    // }, 3 * 60 * 1000); // 3 minutes in milliseconds
    // const ticketDetails = {
    //     user_id: '12345',
    //     train_id: '6633d207da198557b157cdcd',
    //     coach: 'sleeper',
    //     fare: 1500,
    //     booking_time: '2024-05-03T00:05:12.833Z'
    // };

    // Compose email message
    let mailOptions = {
        from: process.env.MAIL,
        to: toEmail, // Recipient's email address
        subject: `Funds Received at ${fundDetails.title}`,
        html: `
            <h1>Donation of ${fundDetails.amount} received at  ${fundDetails.title}. </h1>
            <p><strong>Total Funds Collected:</strong> ${fundDetails.currentAmount}`
    };



    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });

    return info;
}

module.exports = {
    sendEmail2Donar,
    sendEmail2Owner
}