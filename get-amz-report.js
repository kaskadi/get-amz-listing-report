module.exports.handler = async (event) => {
  // const processMsg = require('./helpers/process-msg.js')
  // const getReport = require('./helpers/get-report.js')
  // const parseReport = require('./helpers/parse-report.js')
  // const serializeData = require('./helpers/serialize-data.js')
  // return await getReport(processMsg(event)).then(report => serializeData(parseReport(report)))
  console.log(JSON.stringify(event, null, 2))
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      message: 'Your lambda is running!'
    })
  }
}
