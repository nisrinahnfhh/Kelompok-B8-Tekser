// TODO: Buat koneksi pool MySQL disini menggunakan Environment Variable (process.env)
const mysql = require("mysql2/promise"); // pakai promise-based langsung
require("dotenv").config();

// Buat connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "todosapp",
  password: process.env.DB_PASS || "password123",
  database: process.env.DB_NAME || "todos",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Cek koneksi saat aplikasi start
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Connected to MySQL Database");
    connection.release();
  } catch (err) {
    console.error("❌ Database Connection Failed:", err.message);
    process.exit(1); // hentikan aplikasi jika gagal koneksi
  }
})();

module.exports = pool;
