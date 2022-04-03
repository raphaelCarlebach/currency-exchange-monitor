const express = require("express");
const router = express.Router();
const monitor = require("../modules/monitor");
const doApiGet = require("../services/doApiGet");



router.get('/', async (req, res) => {
    let data = await monitor();
    res.send(data)
});

router.get('/apiget', async (req, res) => {
    let url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json";
    let data = await doApiGet(url)
    res.send(data.data)
});

module.exports = router;
