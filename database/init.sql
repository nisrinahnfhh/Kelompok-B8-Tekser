-- ===============================================
-- DATABASE: todos
-- ===============================================
CREATE DATABASE IF NOT EXISTS todos;
USE todos;

-- Membuat user baru
CREATE USER IF NOT EXISTS 'todosapp'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON todos.* TO 'todosapp'@'localhost';
FLUSH PRIVILEGES;

-- Membuat tabel kategori (pendukung)
CREATE TABLE IF NOT EXISTS Kategori (
    id INT NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Membuat tabel tasks (utama)
CREATE TABLE IF NOT EXISTS Tasks (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    category_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES Kategori(id)
);

-- ===============================
-- INSERT DATA CONTOH
-- ===============================

-- Insert contoh kategori
INSERT INTO Kategori (category_name) VALUES
('Pekerjaan Rumah'),
('Kuliah'),
('Proyek Server'),
('Pribadi');

-- Insert contoh tasks
INSERT INTO Tasks (title, description, status, category_id) VALUES
('Setup Server', 'Menyiapkan server untuk project final', 'In Progress', 3),
('Membuat Presentasi', 'Membuat slide untuk laporan minggu ini', 'Pending', 2),
('Bersih-bersih Rumah', 'Membersihkan ruang kerja dan kamar', 'Done', 1),
('Belajar SQL', 'Mempelajari query dasar dan lanjutan', 'Pending', 2);
