import gdax from 'gdax'

const btcClient = new gdax.PublicClient();

const Bitcoin = {

  async getData({ inputTime }) {

    const ticker = await new Promise(function(resolve, reject) {
      btcClient.getProductTicker(function(err, res, data) {
        resolve(data)
      })
    })

    const historicRates = await new Promise(function(resolve, reject) {

      btcClient.getProductHistoricRates({
          granularity: 60
        }, (err, response) => {
          if (err) console.log('err', err);
      
          var btcHistoric = JSON.parse(response.body);

          if (btcHistoric[0] === undefined) {
            console.log('API Limit Reached.');
            return;
          } else {
            let total = 0;
            for (var i = 0; i < (inputTime); i++) {
              total += (btcHistoric[i][1] + btcHistoric[i][2]) / 2;
            }
            let firstCandle = btcHistoric[(inputTime) - 1];
            const openPrice = (firstCandle[1] + firstCandle[2]) / 2;  
            const averagePrice = total / (inputTime);

            resolve({
              averagePrice,
              percentChange: (ticker.price - openPrice) / ticker.price,
            })

          }
      });
    })

    const { averagePrice, percentChange } = historicRates;

    return {
      price: ticker.price,
      averagePrice,
      inputTime,
      percentChange,
    }
  }
}

export default Bitcoin;