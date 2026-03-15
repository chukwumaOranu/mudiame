const path = require("path");
const dotenv = require("dotenv");
const mysql = require("mysql2/promise");

// Load environment variables from server/.env.development when available.
dotenv.config({ path: path.resolve(__dirname, "../.env.development") });

const dbPool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "mudiame",
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: 0,
});

const testDbConnection = async () => {
  const connection = await dbPool.getConnection();
  try {
    await connection.ping();
    console.log("MySQL connection established.");
  } finally {
    connection.release();
  }
};

module.exports = {
  dbPool,
  testDbConnection,
};
