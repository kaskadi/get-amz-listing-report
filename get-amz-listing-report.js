const MWS = require('mws-client')({
  AWSAccessKeyId: process.env.MWS_KEY_ID,
  SellerId: process.env.AMZ_EU_SELLER_ID,
  MWSAuthToken: process.env.MWS_KEY_SECRET
})

module.exports.handler = async (event) => {
  const getReport = require('./helpers/get-report.js')
  const parseReport = require('./helpers/parse-report.js')
  const processReport = require('./helpers/process-report/process-report.js')
  console.log(JSON.stringify(event, null, 2))
  const eventPayload = event.detail.responsePayload
  let stockData = []
  for (const marketplace of eventPayload.marketplaces) {
    stockData = [
      ...stockData,
      await getReport(MWS, eventPayload.ReportRequestInfo.ReportRequestId, marketplace)
        .then(parseReport)
        .then(processReport(MWS, marketplace))
    ]
  }
  return {
    stockData,
    stocksEventType: 'amz-stocks-update'
  }
}
