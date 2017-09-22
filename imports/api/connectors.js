import gdax from 'gdax'

const btcClient = new gdax.PublicClient();

const Bitcoin = {

  async getData({ inputTimeOne, inputTimeTwo }) {

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
            let totalAverage = 0;
            for (var i = 0; i < (60); i++) {
              totalAverage += (btcHistoric[i][1] + btcHistoric[i][2]) / 2;
            }
            const averagePrice = totalAverage / 60;

            let totalOne = 0;
            for (var i = 0; i < (inputTimeOne); i++) {
              totalOne += (btcHistoric[i][1] + btcHistoric[i][2]) / 2;
            }
            let firstCandleOne = btcHistoric[(inputTimeOne) - 1];
            const openPriceOne = (firstCandleOne[1] + firstCandleOne[2]) / 2;  


            let totalTwo = 0;
            for (var i = 0; i < (inputTimeTwo); i++) {
              totalTwo += (btcHistoric[i][1] + btcHistoric[i][2]) / 2;
            }
            let firstCandleTwo = btcHistoric[(inputTimeOne) - 1];
            const openPriceTwo = (firstCandleTwo[1] + firstCandleTwo[2]) / 2;  
          
      
            resolve({
              averagePrice,
              percentChangeOne: (ticker.price - openPriceOne) / ticker.price,
              percentChangeTwo: (ticker.price - openPriceTwo) / ticker.price
            })

          }
      });
    })

    const { averagePrice, percentChangeOne, percentChangeTwo} = historicRates;

    return {
      price: ticker.price,
      averagePrice,
      inputTimeOne,
      inputTimeTwo,
      percentChangeOne,
      percentChangeTwo,
    }
  }
}

export default Bitcoin;