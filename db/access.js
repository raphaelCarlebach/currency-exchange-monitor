const dbConnection = require("./sqlConnect");

const executeQuery = (query, injection_arr, res) => {
    dbConnection.query(query, injection_arr, function (error, results, fields) {
        if (error) { res.status(400).json(error); return }
        console.log(results)
        res.send(results);
    });
};

exports.executeQuery = executeQuery;

const select = (fields, tbl, condition) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT ${fields} FROM ${tbl + " " + condition}`;
        dbConnection.query(query,  (err, result, field) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.select = select;

const insert = (fields, tbl, injection_arr) => {
    return new Promise((resolve, reject) => {
        let values = ""

        injection_arr.forEach(item => {
            values += "?,"
        });

        let query = `INSERT INTO ${tbl} (${fields}) VALUES (${values.slice(0, -1)})`;
        dbConnection.query(query, injection_arr, (err, result, field) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

exports.insert = insert;
