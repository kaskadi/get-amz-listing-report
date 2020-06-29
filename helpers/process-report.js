module.exports = (parsedReport, marketplace) => {
  const eanAsinMaps = getIdsMaps(parsedReport, 'ean')
  const asinSkuMaps = getIdsMaps(parsedReport, 'asin')
  const productIdsMaps = eanAsinMaps.map(eanAsinMap => {
    return {
      ean: eanAsinMap.ean,
      asinSkuMaps: asinSkuMaps.filter(asinSkuMap => eanAsinMap.asins.includes(asinSkuMap.asin))
    }
  })
  const connectedAsins = eanAsinMaps.flatMap(eanAsinMap => eanAsinMap.asins)
  const orphanedAsinsMaps = asinSkuMaps.filter(asinSkuMap => !connectedAsins.includes(asinSkuMap.asin))
  console.log('Orphaned products (no EAN attached)', JSON.stringify(orphanedAsinsMaps, null, 2)) // to keep track of any orphaned products
  return {
    marketplace,
    marketplaceStockData: productIdsMaps.map(getEanStockData(parsedReport))
  }
}

function getEanStockData (parsedReport) {
  return productIdsMap => {
    return {
      ean: productIdsMap.ean,
      eanStockData: productIdsMap.asinSkuMaps.map(getAsinStockData(parsedReport))
    }
  }
}

function getAsinStockData(parsedReport) {
  return asinSkuMap => {
    return {
      asin: asinSkuMap.asin,
      asinStockData: asinSkuMap.sellerSkus.map(getSkuStockData(parsedReport))
    }
  }
}

function getSkuStockData(parsedReport) {
  return sellerSku => {
    const matchingListings = parsedReport.filter(listing => listing['seller-sku'] === sellerSku)
    return {
      sellerSku,
      quantity: Number(matchingListings[0].quantity),
      pendingQuantity: Number(matchingListings[0]['pending-quantity']),
      condition: matchingListings[0].condition,
      fullfillmentChannel: matchingListings[0]['fullfilment-channel']
    }
  }
}

function getIdsMaps (parsedReport, idType) {
  const listings = idType === 'ean' ? parsedReport.filter(listing => listing['product-id-type'] === '4') : parsedReport
  const keyMaps = getKeyMaps(idType)
  const idDuplets = listings.map(listing => Object.fromEntries(keyMaps.map(keyMap => [keyMap.key, listing[keyMap.listingKey]])))
  const ids = [...new Set(listings.map(listing => listing[keyMaps[0].listingKey]))]
  return ids.map(buildIdsMap(idDuplets, keyMaps))
}

function getKeyMaps (idType) {
  const keyMaps = [{ key: 'ean', listingKey: 'product-id' }, { key: 'asin', listingKey: 'asin1' }, { key: 'sellerSku', listingKey: 'seller-sku' }]
  const idIndex = keyMaps.findIndex(keyMap => keyMap.key === idType)
  return keyMaps.slice(idIndex, idIndex + 2)
}

function buildIdsMap (idDuplets, keyMaps) {
  return id => {
    const matchingDuplets = idDuplets.filter(duplet => duplet[keyMaps[0].key] === id)
    const secondaryIds = [...new Set(matchingDuplets.map(duplet => duplet[keyMaps[1].key]))]
    const idMap = [
      [keyMaps[0].key, id],
      [`${keyMaps[1].key}s`, secondaryIds]
    ]
    return Object.fromEntries(idMap)
  }
}
