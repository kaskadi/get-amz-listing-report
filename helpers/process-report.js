module.exports = (parsedReport, marketplace) => {
  const eans = [...new Set(parsedReport.map(listing => listing['product-id']))]
  return {
    marketplace,
    stockData: eans.map(getDataPerEan(parsedReport))
  }
}

function getDataPerEan(parsedReport) {
  return ean => {
    const matchingListings = parsedReport.filter(getMatchingListings(ean))
    return {
      ean,
      stocks: matchingListings.map(getStocksForEntry)
    }
  }
}

function getMatchingListings(ean) {
  return listing => listing['product-id'] === ean
}

function getStocksForEntry(listing) {
  return {
    asins: Object.entries(listing).filter(entry => entry[0].includes('asin')).map(entry => entry[1]).filter(asin => asin.length > 0),
    sellerSku: listing['seller-sku'],
    quantity: listing.quantity,
    pendingQuantity: listing['pending-quantity'],
    fulfilmentChannel: listing['fulfilment-channel'],
    status: listing.status,
    condition: listing['item-condition']
  }
}