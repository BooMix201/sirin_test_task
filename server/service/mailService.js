import nodemailer from 'nodemailer';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Account activation',
      text: '',
      html:
        `
        <div>
          <h1>Hi there,</h1>
          <h1>Thank you for sign up. Click on the link below to verify your email:</h1>
          <a href="${link}">${link}</a>
        </div>
        `
    });
  }
}

export const mailService = new MailService();
