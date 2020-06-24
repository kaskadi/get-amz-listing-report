module.exports.handler = async (event) => {
  const processMsg = require('./helpers/process-msg.js')
  const getReport = require('./helpers/get-report.js')
  const parseReport = require('./helpers/parse-report.js')
  const processReport = require('./helpers/process-report.js')
  const msgData = processMsg(event.Records[0]) // batchSize set to 1 so we only receive 1 message at a time, hence message = event.Records[0]
  if (!msgData.reportId) {
    return {}
  }
  console.log(JSON.stringify(event, null, 2))
  return await getReport(msgData).then(report => processReport(parseReport(report), msgData.marketplace))
}
