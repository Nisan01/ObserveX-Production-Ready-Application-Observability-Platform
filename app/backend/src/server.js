import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { initDb, query } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

// ── Error simulation middleware ──────────────────────────────
app.use((req, res, next) => {
  if (Math.random() < config.errorRate) {
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Simulated random failure',
    });
  }
  next();
});

// ── Routes ──────────────────────────────────────────────────

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await query(
      `SELECT o.id, o.bike_name, o.quantity, o.price, o.status, o.message, o.created_at,
              u.name AS user_name, u.email AS user_email
       FROM orders o
       LEFT JOIN users u ON o.user_id = u.id
       ORDER BY o.created_at DESC`
    );
    res.json({ orders });
  } catch (err) {
    console.error('[DB Error]', err.message);
    res.status(500).json({ error: 'Database error', message: err.message });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { bike_name, quantity, price, user_name, user_email, message } = req.body;

    if (!bike_name || !price) {
      return res.status(400).json({ error: 'bike_name and price are required' });
    }

    let userId = null;
    if (user_email) {
      const existing = await query('SELECT id FROM users WHERE email = ?', [user_email]);
      if (existing.length > 0) {
        userId = existing[0].id;
      } else {
        const result = await query(
          'INSERT INTO users (name, email) VALUES (?, ?)',
          [user_name || 'Anonymous', user_email]
        );
        userId = result.insertId;
      }
    }

    const status = Math.random() < 0.8 ? 'completed' : 'failed';
    const result = await query(
      'INSERT INTO orders (user_id, bike_name, quantity, price, status, message) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, bike_name, quantity || 1, price, status, message || null]
    );

    res.status(201).json({
      id: result.insertId,
      bike_name,
      quantity: quantity || 1,
      price,
      status,
      message: message || null,
    });
  } catch (err) {
    console.error('[DB Error]', err.message);
    res.status(500).json({ error: 'Database error', message: err.message });
  }
});

app.get('/api/stats', async (req, res) => {
  try {
    const [total] = await query('SELECT COUNT(*) AS count FROM orders');
    const [completed] = await query("SELECT COUNT(*) AS count FROM orders WHERE status = 'completed'");
    const [failed] = await query("SELECT COUNT(*) AS count FROM orders WHERE status = 'failed'");

    res.json({
      total: total.count,
      completed: completed.count,
      failed: failed.count,
      success_rate: total.count > 0 ? ((completed.count / total.count) * 100).toFixed(1) : 0,
    });
  } catch (err) {
    console.error('[DB Error]', err.message);
    res.status(500).json({ error: 'Database error', message: err.message });
  }
});

// ── Start ───────────────────────────────────────────────────

const PORT = config.port;

try {
  await initDb();
  app.listen(PORT, () => {
    console.log(`[Server] ObserveX API running on port ${PORT}`);
    console.log(`[Server] Error simulation rate: ${config.errorRate * 100}%`);
  });
} catch (err) {
  console.error('[Fatal] Failed to start server:', err.message);
  process.exit(1);
}
