require("dotenv").config();
const nodemailer = require("nodemailer");

// describes how we want to send an email, the user here will be your user added in your project at google developer console.
const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.SENDER_PASSWORD,
  },
});

//send mail function make it asynchrounous for non-blocking code
// email content
// seperate with comma in order to send it to multiple users, currently working with outlook and gmail services.

const sendMailWorker = async (data) => {
  const mailOptions = {
    from: '"Campus 4.0"<apps.softwarica@gmail.com>',
    to: data.email,
    subject: "OTP code",
    generateTextFromHTML: true,
    html:
      "<strong>Softwarica College of IT and E-Commerce</strong> <br>" +
      '<span style="color:red;font-size:16px;">This is an auto-generated email, please do not reply to this email. <br></span>' +
      '<a href="https://campus.softwarica.edu.np"><strong>Campus 4.0</strong></a><br><br>' +
      "Please copy the OTP code.<br>" +
      "The link is valid for an five minutes and after that, a new OTP code needs to be requested.<br>" +
      "If you did not request this, please ignore this email.<br>" +
      `<br><strong>${data.otp}</strong><br>`+
      "Campus 4.0 <br>" +
      "Softwarica College of IT and E-Commerce<br>" +
      "Dillibazar, Kathmandu",
  };

  // sending an email in here.
  const resuuu = await smtpTransport.sendMail(mailOptions);
  return resuuu;
};

const sendEmailQueue = require('fastq').promise(sendMailWorker, 2);

module.exports = sendEmailQueue
