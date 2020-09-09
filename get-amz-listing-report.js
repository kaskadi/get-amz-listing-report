module.exports.handler = async (event) => {
  const processMsg = require('./helpers/process-msg.js')
  const getReport = require('./helpers/get-report.js')
  const parseReport = require('./helpers/parse-report.js')
  const processReport = require('./helpers/process-report/process-report.js')
  const publishMsg = require('./helpers/publish-msg.js')
  console.log(JSON.stringify(event, null, 2))
  return true
  // const msgData = processMsg(JSON.parse(event.Records[0].Sns.Message)) // batchSize set to 1 so we only receive 1 message at a time, hence message = event.Records[0]
  // return await getReport(msgData)
  // .then(parseReport)
  // .then(processReport(msgData.marketplace))
  // .then(data => publishMsg(data, process.env.QUEUE_URL))
}
