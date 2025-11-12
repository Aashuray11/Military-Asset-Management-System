require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const assetRoutes = require('./routes/assets');
const transferRoutes = require('./routes/transfers');
const assignmentRoutes = require('./routes/assignments');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Configure CORS origin via environment (useful for Render/Vercel deployments)
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json());

app.get('/', (req, res) => res.send({ ok: true, msg: 'Military Asset Management API' }));

// Health endpoint for platform probing (reports DB connectivity)
app.get('/health', (req, res) => {
  const dbConnected = mongoose.connection && mongoose.connection.readyState === 1;
  res.status(dbConnected ? 200 : 503).json({ status: dbConnected ? 'ok' : 'degraded', dbConnected });
});

app.use('/api/users', authRoutes);
app.use('/api/assets', assetRoutes);
app.use('/api/transfers', transferRoutes);
app.use('/api/assignments', assignmentRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
