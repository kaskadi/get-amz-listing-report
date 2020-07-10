module.exports = async (msgData) => {
  const MWS = require('mws-client')({
    AWSAccessKeyId: process.env.MWS_KEY_ID,
    SellerId: process.env.AMZ_EU_SELLER_ID,
    MWSAuthToken: process.env.MWS_KEY_SECRET,
    parserType: 'text'
  })
  const mwsData = await MWS.reports.getReport({
    _marketplace: msgData.marketplace,
    _httpMethod: 'POST',
    ReportId: msgData.reportId
  })
  return mwsData.body
}