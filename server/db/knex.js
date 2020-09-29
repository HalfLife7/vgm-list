const environment = process.env.NODE_ENV || "development";
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const config = require("../knexfile")[environment];

module.exports = require("knex")(config);
