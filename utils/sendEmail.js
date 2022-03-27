const nodemailer = require('nodemailer');
const ejs = require('ejs');
//const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url , data) {
    this.to = user.email;
    this.username = user.username;
    // luu y gui email tu dau
    this.url = url
    this.data = data
    //this.from = process.env.SENDGRID_EMAIL_FROM;
    this.from = 'sonnguyen@gmail.com';
  }
  newTransporter() {
    //sendgrid
    return nodemailer.createTransport({
     /*  service: 'SendGrid',
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      }, */
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      }
    });
  }
  //send the actual email
  async send(subject) {
    //1) Render HTML bases on view engine
    const html = await ejs.renderFile(
      `${__dirname}/../views/email.ejs`,
      {
        username: this.username,
        subject,
        data: this.data,
        url: this.url
      }
    );
    //2 Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      //text: htmlToText.fromString(html),
    };
    //3) create a tranport and send email
    await this.newTransporter().sendMail(mailOptions);
  }

  async sendMail() {
    await this.send('Order Successfully');
  }
};
