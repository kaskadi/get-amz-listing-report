module.exports.handler = async (event) => {
  console.log(JSON.stringify(event, null, 2))
  const parseMsg = require('./helpers/parse-msg.js')
  const getReport = require('./helpers/get-report.js')
  const parseReport = require('./helpers/parse-report.js')
  const processReport = require('./helpers/process-report.js')
  const msgData = parseMsg(event.Records[0]) // batchSize set to 1 so we only receive 1 message at a time, hence message = event.Records[0]
  if (!msgData.reportId) {
    return {}
  }
  return await getReport(msgData).then(report => processReport(parseReport(report)))
  
}
