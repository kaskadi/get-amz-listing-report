module.exports = marketplace => parsedReport => {
  const getIdsMaps = require('./get-ids-maps.js')
  const getQuantityData = require('./get-quantity-data.js')
  const buildStockData = require('./build-stock-data.js')
  const productIdsMaps = getIdsMaps(parsedReport)
  return getQuantityData(productIdsMaps, marketplace)
  .then(quantityData => buildStockData(productIdsMaps, quantityData, parsedReport, marketplace))
}
