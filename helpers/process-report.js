module.exports = (parsedReport, marketplace) => {
  const eanAsinMap = getIdsMap(parsedReport, 'ean')
  const asinSkuMap = getIdsMap(parsedReport, 'asin')
  console.log(JSON.stringify(eanAsinMap, null, 2))
  console.log(JSON.stringify(asinSkuMap, null, 2))
}

function getIdsMap (parsedReport, idType) {
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
