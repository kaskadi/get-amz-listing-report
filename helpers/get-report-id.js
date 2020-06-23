module.exports = (msg) => {
  const parser = require('xml2json')
  const msgBody = parser.toJson(msg.body, { object: true })
  console.log(JSON.stringify(msgBody, null, 2))
  const msgData = msgBody.Notification.NotificationPayload.ReportProcessingFinishedNotification
  return msgData.ReportType === '_GET_MERCHANT_LISTINGS_ALL_DATA_' ? msgData.ReportId : ''
}