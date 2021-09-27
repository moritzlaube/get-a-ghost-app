const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = async (email, verificationToken) => {
  const msg = {
    to: email,
    from: 'ml@moritzlaube.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: `${verificationToken}<strong>and easy to do anywhere, even with Node.js</strong>`,
  }

  return sgMail.send(msg)
}
