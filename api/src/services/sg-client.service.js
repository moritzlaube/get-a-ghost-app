const sgClient = require('@sendgrid/client')

sgClient.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = (data, method, endpoint) => {
  const request = {
    body: data,
    method,
    url: endpoint,
  }

  return sgClient.request(request)
}
