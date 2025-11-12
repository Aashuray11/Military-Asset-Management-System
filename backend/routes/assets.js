const express = require('express');
const router = require('express').Router();
const { authRequired, requireRole } = require('../middleware/authMiddleware')
const Asset = require('../models/Asset')

// GET /api/assets - list assets (require auth)
router.get('/', authRequired, async (req, res, next) => {
  try{
    const assets = await Asset.find().sort({ createdAt: -1 }).lean()
    res.json(assets)
  }catch(err){ next(err) }
})

// POST /api/assets - create a new asset (purchase) - only logistics & admin
router.post('/', authRequired, requireRole('admin','logistics'), async (req, res, next) => {
  try{
    const { name, type, quantity = 1, base, metadata } = req.body || {}
    if(!name || !type || !base) return res.status(400).json({ message: 'Missing fields' })
    const asset = new Asset({ name, type, quantity, base, metadata })
    await asset.save()
    res.status(201).json(asset)
  }catch(err){ next(err) }
})

module.exports = router;
