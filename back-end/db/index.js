var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/chatterbox1";
var db = pgp(connectionString);

module.exports = db;