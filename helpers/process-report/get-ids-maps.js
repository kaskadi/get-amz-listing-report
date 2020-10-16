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
  console.log(`Orphaned products for ${marketplace} (no EAN attached)`, JSON.stringify(orphanedAsinsMaps, null, 2)) // to keep track of any orphaned products
  return productIdsMaps
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
