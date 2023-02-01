var mysql = require("mysql");
import knex from "knex";

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
  port: process.env.DB_PORT,
});

// connection.connect();

function executeQuery(
  { query, values }: { query: string; values: any[] },
  cb: (results: any) => any
) {
  connection.query(
    query,
    values,
    function (error: any, results: any, fields: any) {
      if (error) throw error;
      // connection.release()
      return cb(results);
    }
  );
  // connection.end();
}

/**
 * Register service.
 * @description Stores instances in `global` to prevent memory leaks in development.
 * @arg {string} name Service name.
 * @arg {function} initFn Function returning the service instance.
 * @return {*} Service instance.
 */
const registerService = (name: any, initFn: () => void) => {
  if (process.env.NODE_ENV === "development") {
    if (!(name in global)) {
      global[name] = initFn();
    }
    return global[name];
  }
  return initFn();
};

const db = registerService("db", () =>
  knex({
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DB,
      port: parseInt(process.env.DB_PORT!),
    },
  })
);

export { executeQuery, registerService, db };
