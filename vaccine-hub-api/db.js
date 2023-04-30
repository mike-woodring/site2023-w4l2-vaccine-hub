const { Client } = require("pg");
const { getDatabaseUri } = require("./config");
require("colors");

const db = new Client({
    connectionString: getDatabaseUri()
});

db.connect((err) => {
    if (err) {
        console.error("Connection error", err.stack);
    } else {
        console.log("Successfully connected to database.");
    }
});

module.exports = db;
