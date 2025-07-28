// backend/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM students', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

router.post('/', (req, res) => {
  const { name, roll, grades } = req.body;
  const gradesStr = grades.join(',');
  const sql = 'INSERT INTO students (name, roll, grades) VALUES (?, ?, ?)';
  db.query(sql, [name, roll, gradesStr], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Student added');
  });
});

router.delete('/:roll', (req, res) => {
  const roll = req.params.roll;
  db.query('DELETE FROM students WHERE roll = ?', [roll], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Student removed');
  });
});

router.put('/:roll', (req, res) => {
  const roll = parseInt(req.params.roll);
  const { name, newRoll, grades } = req.body;
  const gradesStr = grades.join(',');

  const sql = 'UPDATE students SET name = ?, roll = ?, grades = ? WHERE roll = ?';
  db.query(sql, [name, newRoll, gradesStr, roll], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Student updated');
  });
});


module.exports = router;
