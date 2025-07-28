// backend/server.js
const express = require('express');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/students', studentRoutes); // No /api needed to match frontend

app.listen(5000, () => {
  console.log(' Server running at http://localhost:5000');
});
