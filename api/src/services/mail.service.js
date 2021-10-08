const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = async (email, subject, html) => {
  const msg = {
    to: email,
    from: 'ml@moritzlaube.com',
    subject,
    text: 'and easy to do anywhere, even with Node.js',
    html,
  }

  return sgMail.send(msg)
}
