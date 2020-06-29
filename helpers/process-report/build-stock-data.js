module.exports = (productIdsMaps, quantityData, parsedReport, marketplace) => {
  console.log(JSON.stringify(quantityData, null, 2))
  return {
    marketplace,
    marketplaceStockData: productIdsMaps.map(getEanStockData(parsedReport, quantityData))
  }
}

function getEanStockData (parsedReport, quantityData) {
  return productIdsMap => {
    return {
      ean: productIdsMap.ean,
      eanStockData: productIdsMap.asinSkuMaps.map(getAsinStockData(parsedReport, quantityData))
    }
  }
}

function getAsinStockData(parsedReport, quantityData) {
  return asinSkuMap => {
    return {
      asin: asinSkuMap.asin,
      asinStockData: asinSkuMap.sellerSkus.map(getSkuStockData(parsedReport, quantityData))
    }
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