module.exports = async (reportId) => {
  const MWS = require('mws-client')({
    AWSAccessKeyId: process.env.ACCESS_KEY,
    SellerId: process.env.SELLER_ID,
    MWSAuthToken: process.env.MWS_AUTH_TOKEN,
    parserType: 'text'
  })
  // we can use 'DE' as marketplace because all european marketplaces have the same endpoint + our SellerID/tokens are nevertheless scoped to EU region
  const mwsData = await MWS.reports.getReport({
    _marketplace: 'DE',
    _httpMethod: 'POST',
    ReportId: reportId
  })
  return mwsData.body
}