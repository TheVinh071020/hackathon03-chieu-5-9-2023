const mysql = require("mysql2");

let pool = mysql.createPool({
  database: "hackathon_module3",
  host: "localhost",
  user: "root",
  password: "07102000",
  port: "3306",
});

module.exports = pool.promise();
