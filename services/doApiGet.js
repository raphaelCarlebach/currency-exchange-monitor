const axios = require('axios');

const doApiGet = async (url) => {
    let data = await axios.get(url)
        .then(function (response) {
            // handle success
            //console.log(response);
            return response
        })
        .catch(function (error) {
            // handle error
            console.log(error);
            return error
        });

    return await data
}

module.exports = doApiGet;