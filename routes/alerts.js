const express = require("express");
const router = express.Router();
const { select, insert } = require("../db/access");

//get all alerts
router.get('/all', async (req, res) => {

  let executeQuery = await select("*", "alerttbl", "").then(data => {
    return data
  });

  res.send(executeQuery)
});

// add new alert 
router.post('/new', async (req, res) => {
  //timestamp = current_timestamp()	
  let currencySymbol = req.body.currencySymbol;
  let valueToDate = req.body.valueToDate;

  let executeQuery = await insert("CurrencySymbolFld,ValueToDateFld", "alerttbl", [currencySymbol, valueToDate]).then(data => {
    return data
  });

  res.send(executeQuery)

});


module.exports = router;
