const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role, base: user.base }, process.env.JWT_SECRET || 'changeme', { expiresIn: '8h' });
}

async function register(req, res, next) {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not connected. Set MONGODB_URI in backend/.env and restart server.' });
    }
    const { name, email, password, role, base } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });
    user = new User({ name, email, password, role: role || 'logistics', base });
    await user.save();
    const token = generateToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, base: user.base } });
  } catch (err) { next(err) }
}

async function login(req, res, next) {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ message: 'Database not connected. Set MONGODB_URI in backend/.env and restart server.' });
    }
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, base: user.base } });
  } catch (err) { next(err) }
}

async function me(req, res, next){
  try{
    const uid = req.user && req.user.id
    if(!uid) return res.status(401).json({ message: 'Not authenticated' })
    const user = await User.findById(uid).select('-password').lean()
    if(!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  }catch(err){ next(err) }
}

async function listUsers(req, res, next){
  try{
    // extra guard: ensure admin
    if(!req.user || req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' })
    const users = await User.find().select('-password').lean()
    res.json(users)
  }catch(err){ next(err) }
}

module.exports = { register, login, me, listUsers };

