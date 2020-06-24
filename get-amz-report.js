module.exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 2))
  const getReportId = require('./helpers/get-report-id.js')
  const getReport = require('./helpers/get-report.js')
  const parseReport = require('./helpers/parse-report.js')
  const processReport = require('./helpers/process-report.js')
  const reportId = getReportId(event.Records[0]) // batchSize set to 1 so we only receive 1 message at a time, hence message = event.Records[0]
  if (reportId.length === 0) {
    return {}
  }
  return await getReport(reportId).then(report => processReport(parseReport(report)))
  
}
