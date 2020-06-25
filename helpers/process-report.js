module.exports = (parsedReport, marketplace) => {
  const eanAsinMap = getIdsMap(parsedReport, 'ean')
  const asinSkuMap = getIdsMap(parsedReport, 'asin')
  console.log(JSON.stringify(eanAsinMap, null, 2))
  console.log(JSON.stringify(asinSkuMap, null, 2))
}

function getIdsMap (parsedReport, idType) {
  const listings = idType === 'ean' ? parsedReport.filter(listing => listing['product-id-type'] === '4') : parsedReport
  const idKeysMaps = getIdKeysMaps(idType)
  const idDuplets = listings.map(listing => Object.fromEntries(idKeysMaps.map(idKeysMap => [idKeysMap.key, listing[idKeysMap.listingKey]])))
  const ids = [...new Set(listings.map(listing => listing[idKeysMaps[0].listingKey]))]
  return ids.map(buildIdsMap(idDuplets, idKeysMaps))
}

function getIdKeysMaps (idType) {
  const IdKeysMaps = [{ key: 'ean', listingKey: 'product-id' }, { key: 'asin', listingKey: 'asin1' }, { key: 'sellerSku', listingKey: 'seller-sku' }]
  const idIndex = IdKeysMaps.findIndex(IdKeysMap => IdKeysMap.key === idType)
  return IdKeysMaps.slice(idIndex, idIndex + 2)
}

function buildIdsMap (idDuplets, idKeysMaps) {
  return id => {
    const matchingDuplets = idDuplets.filter(duplet => duplet[idKeysMaps[0].key] === id)
    const idMapHandler = (idKeysMap, i) => i === 0 ? [idKeysMap.key, id] : [`${idKeysMap.key}s`, matchingDuplets.map(duplet => duplet[idKeysMaps[1].key])]
    const idMap = idKeysMaps.map(idMapHandler)
    return Object.fromEntries(idMap)
  }
}

// module.exports = (parsedReport, marketplace) => {
//   const eans = [...new Set(parsedReport.map(listing => listing['product-id']))]
//   return {
//     marketplace,
//     stockData: eans.map(getDataPerEan(parsedReport))
//   }
// }

// function getDataPerEan(parsedReport) {
//   return ean => {
//     const matchingListings = parsedReport.filter(getMatchingListings(ean))
//     return {
//       ean,
//       stocks: matchingListings.map(getStocksForEntry)
//     }
//   }
// }

// function getMatchingListings(ean) {
//   return listing => listing['product-id'] === ean
// }

// function getStocksForEntry(listing) {
//   return {
//     asins: Object.entries(listing).filter(entry => entry[0].includes('asin')).map(entry => entry[1]).filter(asin => asin.length > 0),
//     sellerSku: listing['seller-sku'],
//     quantity: listing.quantity,
//     pendingQuantity: listing['pending-quantity'],
//     fulfilmentChannel: listing['fulfilment-channel'],
//     status: listing.status,
//     condition: listing['item-condition']
//   }
// }