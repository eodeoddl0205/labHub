require('dotenv').config();
const express = require('express');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'If-None-Match'],
  exposedHeaders: ['ETag'],
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

const reservationsRoutes = require('./routes/reservationsRoutes.js');
const calendarRoutes = require('./routes/calendarRoutes.js');

app.use('/api/reservations', reservationsRoutes);
app.use('/api/calendar', calendarRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});