// TODO: Ini adalah titik masuk aplikasi, setup Express, Middleware, dan Server Listener disini
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

// Import Routes
const todosRoutes = require('./routes/index');

// Set EJS sebagai view engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // untuk css jika mau ditambah nanti

// --- ROUTING ---
// Route To-Dos
app.use('/', todosRoutes);

// Jalankan Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});