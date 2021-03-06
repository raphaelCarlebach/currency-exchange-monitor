const doApiGet = require("../services/doApiGet");
const { select, insert } = require("../db/access");

const monitor = async () => {
    let latestCurrencies_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json";
    let latestCurrencies = await doApiGet(latestCurrencies_url);
    let watchedCurrencies = await select("*", "watchedcurrencytbl", "").then(data => {
        return data
    });

    let watchedCurrenciesFound = 0;
    let newAlerts = 0;

    const alerts_arr = [];

    const found = new Promise((resolve, reject) => {
        watchedCurrencies.forEach((currency, index) => {
            //check if the watched currencys  are in the  latest  currency-api result
            Object.keys(latestCurrencies.data.usd).find(symbol => {
                if (symbol === currency.CurrencySymbolFld) {
                    watchedCurrenciesFound++
                    //check if the exchange value != to the threshold
                    if (currency.ThresholdFld != latestCurrencies.data.usd[symbol]) {
                        // create a new alert obj 
                        let alert_obj = {
                            timestamp: latestCurrencies.data.date,
                            currencySymbol: symbol,
                            valueToDate: latestCurrencies.data.usd[symbol]
                        };

                        alerts_arr.push(alert_obj)

                        //  insert alert into db
                        insert("CurrencySymbolFld,ValueToDateFld,TimestampFld", "alerttbl", [alert_obj.currencySymbol, alert_obj.valueToDate, alert_obj.timestamp]).then((data) => {
                            console.log(data)
                            newAlerts++
                            // check if loop has finished
                            if (watchedCurrenciesFound == newAlerts) {
                                resolve({
                                    msg: `there is ${newAlerts} new alerts`,
                                    data: alerts_arr
                                })
                            };
                        });

                    } else {
                        //add anyway, threshold is equel to value
                        newAlerts++
                        // check if loop has finished
                        if (watchedCurrenciesFound == newAlerts) {
                            resolve({
                                msg: `there is ${newAlerts} new alerts`,
                                data: alerts_arr
                            })
                        }
                    }
                } else {
                    // check if loop has finished and no currency has been found
                    if (index == watchedCurrencies.length) {
                        resolve({
                            msg: `there is ${newAlerts} new alerts`,
                            data: alerts_arr
                        })
                    }
                }
            });
        });
    });

    return await found.then((result) => {
        console.log(result)
        return result
    })

}

module.exports = monitor;