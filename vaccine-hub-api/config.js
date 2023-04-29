require("dotenv").config();
require("colors");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;

function getDatabaseUri() {
    const dbUser = process.env.DATABASE_USER || "postgres";
    const dbPassword = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : "postgres";
    const dbHost = process.env.DATABASE_HOST || "localhost";
    const dbPort = process.env.DATABASE_PORT || 5432;
    const dbName = process.env.DATABASE_NAME || "vaccine_hub";

    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
}

console.log({
    "context": "config.js",
    "port": PORT,
    "DBURI": getDatabaseUri()
});

module.exports = {
    PORT,
    getDatabaseUri
};