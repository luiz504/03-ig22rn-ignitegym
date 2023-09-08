const path = require("path");


/** @type {import('knex').Knex.Config} */
const config = {  
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db")
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "migrations")
    },
    seeds: {
      directory: path.resolve(__dirname, "src", "database", "seeds")
    },
    useNullAsDefault: true,      
  }
};

module.exports = config