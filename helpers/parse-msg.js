module.exports = (msg) => {
  const bodyData = getBodyData(msg)
  if (bodyData.ReportType !== '_GET_MERCHANT_LISTINGS_ALL_DATA_') {
    return {}
  }
  return {
    reportId: bodyData.ReportId,
    marketplace: getMarketplace(msg)
  }
}

function getBodyData (msg) {
  const parser = require('xml2json')
  const msgBody = parser.toJson(msg.body, { object: true })
  console.log(JSON.stringify(msgBody, null, 2))
  return msgBody.Notification.NotificationPayload.ReportProcessingFinishedNotification
}

function getMarketplace (msg) {
  const eventSourceARN = msg.eventSourceARN
  const queueName = eventSourceARN.split(':')[eventSourceARN.length - 1]
  return queueName.split('-')[queueName.length -1]
}