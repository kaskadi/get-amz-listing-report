module.exports = (parsedReport) => {
  const eans = [...new Set(parsedReport.map(listing => listing['product-id']))]
  return eans.map(getDataPerEan(parsedReport))
}

function getDataPerEan(parsedReport) {
  return ean => {
    const matchingListings = parsedReport.filter(getMatchingListings(ean))
    return {
      ean,
      stockData: matchingListings.map(getStockDataForEntry)
    }
  }
}

function getMatchingListings(ean) {
  return listing => listing['product-id'] === ean
}

function getStockDataForEntry(listing) {
  return {
    asins: Object.entries(listing).filter(entry => entry[0].includes('asin')).map(entry => entry[1]),
    sellerSku: listing['seller-sku'],
    quantity: listing.quantity,
    pendingQuantity: listing['pending-quantity'],
    fulfilmentChannel: listing['fulfilment-channel'],
    status: listing.status,
    condition: listing['item-condition']
  }
}