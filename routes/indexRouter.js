const express = require("express");
const router = express.Router();

const doApiGet = require("../services/apiFetch");

/* GET home page. */
router.get('/', (req, res) => {
  res.send("app working");
});


router.get('/apiget', async (req, res) => {
  let url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json";

  let data = await doApiGet(url)
  res.send(data.data)

});

module.exports = router;
