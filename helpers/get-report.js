module.exports = async (msgData) => {
  const MWS = require('mws-client')({
    AWSAccessKeyId: process.env.ACCESS_KEY,
    SellerId: process.env.SELLER_ID,
    MWSAuthToken: process.env.MWS_AUTH_TOKEN,
    parserType: 'text'
  })
  const mwsData = await MWS.reports.getReport({
    _marketplace: msgData.marketplace,
    _httpMethod: 'POST',
    ReportId: msgData.reportId
  })
  return mwsData.body
}