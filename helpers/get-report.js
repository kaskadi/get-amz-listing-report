const MWS = require('mws-client')({
  AWSAccessKeyId: process.env.MWS_KEY_ID,
  SellerId: process.env.AMZ_EU_SELLER_ID,
  MWSAuthToken: process.env.MWS_KEY_SECRET
})

module.exports = (reportRequestId, marketplace) => {
  return pollReport(reportRequestId, marketplace)
    .then(getReportId(marketplace))
    .then(fetchReport(marketplace))
}

async function pollReport (reportRequestId, marketplace) {
  let reportReady = false
  let reportRequestInfo
  while (!reportReady) {
    reportRequestInfo = await MWS.reports.getReportRequestList({
      _marketplace: marketplace,
      _httpMethod: 'POST',
      'ReportRequestIdList.Id.1': reportRequestId
    }).then(data => data.body.GetReportRequestListResponse.GetReportRequestListResult.ReportRequestInfo)
    reportReady = reportRequestInfo.ReportProcessingStatus === '_DONE_'
    if (!reportReady) {
      await new Promise(resolve => setTimeout(resolve, 45000))
    }
  }
  return reportRequestInfo
}

function getReportId (marketplace) {
  return reportRequestInfo => reportRequestInfo.GeneratedReportId || MWS.reports.getReportList({
    _marketplace: marketplace,
    _httpMethod: 'POST',
    'ReportRequestIdList.Id.1': reportRequestInfo.reportRequestId
  }).then(data => data.body.GetReportListResponse.GetReportListResult.ReportInfo.ReportId)
}

function fetchReport (marketplace) {
  return reportId => MWS.reports.getReport({
    _marketplace: marketplace,
    _httpMethod: 'POST',
    ReportId: reportId,
    parserType: 'text'
  }).then(data => data.body)
}
