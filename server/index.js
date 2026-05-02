import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Mock data
const users = [
  { id: 'U1', email: 'admin@transitads.in', password: 'admin123', name: 'Admin User', role: 'admin', company: 'Nashik TransitAds' },
  { id: 'U2', email: 'demo@brand.com', password: 'demo123', name: 'Rajesh Sharma', role: 'advertiser', company: 'GreenLeaf Beverages Pvt. Ltd.' },
];

// Auth
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    const { password: _, ...userData } = user;
    res.json({ success: true, user: userData, token: 'mock-jwt-token-' + user.id });
  } else {
    res.status(401).json({ success: false, error: 'Invalid credentials' });
  }
});

app.post('/api/auth/signup', (req, res) => {
  const userData = { id: 'U' + Date.now(), ...req.body, role: 'advertiser' };
  const { password: _, ...safe } = userData;
  res.json({ success: true, user: safe, token: 'mock-jwt-token-' + userData.id });
});

// Health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚌 Nashik TransitAds API running on port ${PORT}`);
});
