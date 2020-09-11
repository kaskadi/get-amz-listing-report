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
      await getReport(eventPayload.ReportRequestInfo.ReportRequestId, marketplace)
        .then(parseReport)
        .then(processReport(marketplace))
    ]
  }
  return {
    stockData,
    stocksEventType: 'amz-stocks-update'
  }
}
