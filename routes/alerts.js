const express = require("express");
const router = express.Router();

const dbConnection = require("../db/sqlConnect");

//get all alerts
router.get('/all', (req, res) => {
  let query = "SELECT * FROM alerttbl";
  dbConnection.query(query, (err, results) => {
    if (err) { res.status(400).json(err); return }
    res.send(results);
  })
});

// add new alert 
router.post('/new', (req, res) => {
    //timestamp = current_timestamp()	
    let currencySymbol = req.body.currencySymbol; 
    let valueToDate = req.body.valueToDate; 

    let query = `INSERT INTO alerttbl (CurrencySymbolFld,ValueToDateFld) VALUES (?,?);`;

    dbConnection.query(query, [ currencySymbol, valueToDate], function (error, results, fields) {
        if (error) { res.status(400).json(error); return }
        console.log(results)
        res.send(results);
    });
});


module.exports = router;
