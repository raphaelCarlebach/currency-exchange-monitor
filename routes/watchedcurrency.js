const express = require("express");
const router = express.Router();
const dbConnection = require("../db/sqlConnect");
const { validateCurrency } = require("../models/validateCurrency");
const { select, insert } = require("../db/access");


//get all  watched currencyes
router.get('/all', async (req, res) => {
    let executeQuery = await select("*", "watchedcurrencytbl", "").then(data => {
        return data
    });
    
    res.send(executeQuery)
});


//add a new watched currency
router.post('/new', async (req, res) => {
    console.log("body= ", req.body)
    let valid = validateCurrency(req.body);
    if (!valid.error) {
        let currencySymbol = req.body.currencySymbol; //unique 
        let threshold = req.body.threshold;

        let executeQuery = await insert("CurrencySymbolFld,ThresholdFld", "watchedcurrencytbl", [currencySymbol, threshold]).then(data => {
            return data
        });

        res.send(executeQuery)

    } else {
        res.status(400).json(valid.error.details)
    };
});


module.exports = router;
