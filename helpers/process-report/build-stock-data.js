module.exports = (productIdsMaps, quantityData, parsedReport, marketplace) => {
  return {
    marketplace,
    marketplaceStockData: productIdsMaps.map(getEanAsinStockData(parsedReport, quantityData, 'ean'))
  }
}

function getEanAsinStockData (parsedReport, quantityData, type) {
  return data => {
    var res = {}
    res[type] = data[type]
    res[`${type}StockData`] = data[type === 'ean' ? 'asinSkuMaps' : 'sellerSkus']
      .map(type === 'ean' ? getEanAsinStockData(parsedReport, quantityData, 'asin') : getSkuStockData(parsedReport, quantityData))
    return res
  }
}

function getSkuStockData(parsedReport, quantityData) {
  return sellerSku => {
    const matchingListing = parsedReport.filter(listing => listing['seller-sku'] === sellerSku)[0]
    return {
      sellerSku,
      quantity: quantityData[sellerSku].quantity,
      condition: quantityData[sellerSku].condition,
      fulfilmentChannel: matchingListing['fulfilment-channel']
    }
  }
}