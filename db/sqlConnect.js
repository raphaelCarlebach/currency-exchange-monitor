const mySql = require("mysql");
require('dotenv').config()


const dbConnection = mySql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

dbConnection.connect(err => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log("mysql connected")
});


module.exports = dbConnection;