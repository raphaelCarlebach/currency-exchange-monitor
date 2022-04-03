const express = require("express");
const router = express.Router();
const dbConnection = require("../db/sqlConnect");
const { validateCurrency } = require("../models/validateCurrency");

//get all  watched currencyes
router.get('/all', (req, res) => {
    let query = "SELECT * FROM watchedcurrencytbl";
    dbConnection.query(query, (err, results) => {
        if (err) { res.status(400).json(err); return }
        res.send(results);
    })
});


//add a new watched currency
router.post('/new', (req, res) => {
    console.log("body= ", req.body)
    let valid = validateCurrency(req.body);
    if (!valid.error) {
        let currencySymbol = req.body.currencySymbol; //unique 
        let threshold = req.body.threshold;

        let query = `INSERT INTO watchedcurrencytbl (CurrencySymbolFld,ThresholdFld) VALUES (?,?);`;
        dbConnection.query(query, [currencySymbol, threshold], function (error, results, fields) {
            if (error) { res.status(400).json(error); return }
            console.log(results)
            res.send(results);
        });
    } else {
        res.status(400).json(valid.error.details)
    };
});


module.exports = router;
