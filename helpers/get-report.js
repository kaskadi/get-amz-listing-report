module.exports = async (reportId) => {
  const MWS = require('mws-client')({
    AWSAccessKeyId: process.env.ACCESS_KEY,
    SellerId: process.env.SELLER_ID,
    MWSAuthToken: process.env.MWS_AUTH_TOKEN,
    parserType: 'text'
  })
}