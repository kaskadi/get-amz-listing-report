module.exports = (rawReport) => {
  const report = rawReport.trim()
  const lines = report.split('\n')
  const columns = lines[0].split('\t')
  return lines.slice(1).map(line => Object.fromEntries(line.split('\t').map((value, i) => [columns[i], value])))
}