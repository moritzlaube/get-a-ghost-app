const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = async (email, subject, html) => {
  const msg = {
    to: email,
    from: process.env.SG_EMAIL,
    subject,
    html,
  }

  return sgMail.send(msg)
}
