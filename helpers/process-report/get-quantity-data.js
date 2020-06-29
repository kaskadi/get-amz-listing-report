const MWS = require('mws-client')({
  AWSAccessKeyId: process.env.ACCESS_KEY,
  SellerId: process.env.SELLER_ID,
  MWSAuthToken: process.env.MWS_AUTH_TOKEN
})

module.exports = async (productIdsMaps, marketplace) => {
  const sellerSkus = productIdsMaps.flatMap(productIdsMap => productIdsMap.asinSkuMaps.flatMap(asinSkuMap => asinSkuMap.sellerSkus))
  let quantityData = {}
  const restoreRate = 500
  for (let i = 0; i <= sellerSkus.length - 1 ; i+=50) {
    const partialSellerSkus = sellerSkus.slice(i, i + 50)
    let mwsData = await listInventorySupply(partialSellerSkus, marketplace, restoreRate)
    let result = mwsData.body.ListInventorySupplyResponse.ListInventorySupplyResult
    let nextToken = result.NextToken
    let stocks = result.InventorySupplyList.member ? processStocksData(result.InventorySupplyList.member) : {}
    while (nextToken) {
      const nextData = await listInventorySupplyByNextToken(nextToken, marketplace, restoreRate)
      result = nextData.body.ListInventorySupplyByNextTokenResponse.ListInventorySupplyByNextTokenResult
      nextToken = result.NextToken
      stocks = {...stocks, ...processStocksData(result.InventorySupplyList.member)}
    }
    quantityData = {...quantityData, ...stocks}
  }
  return quantityData
}

function listInventorySupply (sellerSkus, marketplace, restoreRate) {
  return new Promise(resolve => setTimeout(resolve, restoreRate))
  .then(res => MWS.fulfillmentInventory.listInventorySupply({
    ...Object.fromEntries(sellerSkus.map((sellerSku, i) => [`SellerSkus.member.${i + 1}`, sellerSku])),
    ResponseGroup: 'Basic',
    _marketplace: marketplace
  }))
}

function listInventorySupplyByNextToken (NextToken, marketplace, restoreRate) {
  return new Promise(resolve => setTimeout(resolve, restoreRate))
  .then(res => MWS.fulfillmentInventory.listInventorySupplyByNextToken({
    NextToken,
    _marketplace: marketplace
  }))
}

function processStocksData (stockData) {
  return Object.fromEntries(stockData.map(data => [
    data.SellerSKU,
    { quantity: Number(data.InStockSupplyQuantity), condition: data.Condition }
  ]))
}