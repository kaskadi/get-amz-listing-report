module.exports = (msg) => {
  return {
    reportId: msg.body.Notification.NotificationPayload.ReportProcessingFinishedNotification.ReportId,
    marketplace: getMarketplace(msg)
  }
}

function getMarketplace (msg) {
  const eventSourceARN = msg.eventSourceARN
  const queueName = eventSourceARN.split(':').pop()
  return queueName.split('-').pop()
}
