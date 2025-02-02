const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// PostgreSQL bağlantısı
const pool = new Pool({
  user: 'myuser',
  host: 'localhost',
  database: 'users_db',
  password: 'mypassword',
  port: 5432,
});

app.use(express.json());

let users = [
  { id: 1, name: 'Ayça' },
  { id: 2, name: 'Sena' }
];

// Kullanıcıları al
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Yeni kullanıcı oluştur
app.post('/api/users', async (req, res) => {
  const { name } = req.body;
  try {
    const result = await pool.query('INSERT INTO users(name) VALUES($1) RETURNING *', [name]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Kullanıcıyı güncelle
app.put('/api/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  const { name } = req.body;
  try {
    const result = await pool.query('UPDATE users SET name = $1 WHERE id = $2 RETURNING *', [name, userId]);
    if (result.rows.length === 0) {
      res.status(404).send('User not found');
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Kullanıcıyı sil
app.delete('/api/users/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
    if (result.rows.length === 0) {
      res.status(404).send('User not found');
    } else {
      res.status(204).send();
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
