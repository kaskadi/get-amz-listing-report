module.exports = (MWS, reportRequestId, marketplace) => {
  return pollReport(MWS, reportRequestId, marketplace)
    .then(getReportId(marketplace))
    .then(fetchReport(MWS, marketplace))
}

async function pollReport (MWS, reportRequestId, marketplace) {
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

function fetchReport (MWS, marketplace) {
  return reportId => MWS.reports.getReport({
    _marketplace: marketplace,
    _httpMethod: 'POST',
    ReportId: reportId,
    parserType: 'text'
  }).then(data => data.body)
}
