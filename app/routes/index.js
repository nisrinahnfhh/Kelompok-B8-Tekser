// TODO: Definisikan semua jalur (Route) aplikasi kalian disini (GET, POST, PUT, DELETE)
const express = require('express');
const router = express.Router();
const pool = require('../config/database');

// Halaman daftar tugas
router.get('/', async (req, res) => {
    try {
        const [tasks] = await pool.query(
            `SELECT Tasks.id, Tasks.title, Tasks.description, Tasks.status, Tasks.created_at, Kategori.category_name 
             FROM Tasks 
             LEFT JOIN Kategori ON Tasks.category_id = Kategori.id
             ORDER BY Tasks.created_at DESC`
        );
        res.render('index', { tasks });
    } catch (err) {
        console.error(err);
        res.send("Error loading tasks");
    }
});

// Halaman tambah tugas
router.get('/add', async (req, res) => {
    try {
        const [categories] = await pool.query(`SELECT * FROM Kategori`);
        res.render('add', { categories });
    } catch (err) {
        console.error(err);
        res.send("Error loading categories");
    }
});

// Handle form tambah tugas
router.post('/add', async (req, res) => {
    const { title, description, category_id } = req.body;
    try {
        await pool.query(
            `INSERT INTO Tasks (title, description, category_id) VALUES (?, ?, ?)`,
            [title, description, category_id]
        );
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.send("Error adding task");
    }
});

// ... kode sebelumnya tetap

// Halaman edit tugas
router.get('/edit/:id', async (req, res) => {
    const taskId = req.params.id;
    try {
        const [tasks] = await pool.query(`SELECT * FROM Tasks WHERE id = ?`, [taskId]);
        const [categories] = await pool.query(`SELECT * FROM Kategori`);
        if (tasks.length === 0) return res.send("Task not found");
        res.render('edit', { task: tasks[0], categories });
    } catch (err) {
        console.error(err);
        res.send("Error loading task");
    }
});

// Handle form edit tugas
router.post('/edit/:id', async (req, res) => {
    const taskId = req.params.id;
    const { title, description, status, category_id } = req.body;
    try {
        await pool.query(
            `UPDATE Tasks SET title = ?, description = ?, status = ?, category_id = ? WHERE id = ?`,
            [title, description, status, category_id, taskId]
        );
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.send("Error updating task");
    }
});

// Delete task
router.post('/delete/:id', async (req, res) => {
    const taskId = req.params.id;
    try {
        await pool.query(`DELETE FROM Tasks WHERE id = ?`, [taskId]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.send("Error deleting task");
    }
});

module.exports = router;