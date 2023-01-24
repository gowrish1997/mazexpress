var mysql = require("mysql");
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
  port: process.env.DB_PORT
});
connection.connect();

function executeQuery({query, values}: {query: string, values: any[]}, cb: (results: any) => any) {
  connection.query(query, values, function (error: any, results: any, fields: any) {
    if (error) throw error;
    // connection.end();
    console.log("The solution is: ", results);

    return cb(results)
  });
}

export { executeQuery };
