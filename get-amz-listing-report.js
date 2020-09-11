module.exports.handler = async (event) => {
  const getReport = require('./helpers/get-report.js')
  const parseReport = require('./helpers/parse-report.js')
  const processReport = require('./helpers/process-report/process-report.js')
  console.log(JSON.stringify(event, null, 2))
  const eventPayload = event.detail.responsePayload
  let stocks = []
  for (const marketplace of eventPayload.marketplaces) {
    const stocksData = await getReport(eventPayload.ReportRequestInfo.ReportRequestId, marketplace)
      .then(parseReport)
      .then(processReport(marketplace))
    stocks = [...stocks, stocksData]
  }
  return {
    stocks,
    stocksEventType: 'amz-stocks-update'
  }
}
