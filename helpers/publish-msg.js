const AWS = require('aws-sdk')
const SQS = new AWS.SQS({ apiVersion: '2012-11-05' })

module.exports = (body, QueueUrl) => {
  const params = {
    QueueUrl,
    MessageBody: JSON.stringify(body)
  }
  return SQS.sendMessage(params).promise()
}
