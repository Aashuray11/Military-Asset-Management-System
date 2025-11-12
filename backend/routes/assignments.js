const express = require('express');
const router = require('express').Router()
const { authRequired, requireRole } = require('../middleware/authMiddleware')
const Assignment = require('../models/Assignment')
const Asset = require('../models/Asset')

// GET /api/assignments
router.get('/', authRequired, async (req, res, next) => {
	try{
		const list = await Assignment.find().populate('asset').sort({ assignedAt: -1 }).lean()
		res.json(list)
	}catch(err){ next(err) }
})

// POST /api/assignments - only admin/commander
router.post('/', authRequired, requireRole('admin','commander'), async (req, res, next) => {
	try{
		const { asset: assetId, assignedTo, quantity = 1, notes } = req.body || {}
		if(!assetId || !assignedTo || !quantity) return res.status(400).json({ message: 'Missing fields' })
		const asset = await Asset.findById(assetId)
		if(!asset) return res.status(404).json({ message: 'Asset not found' })
		const a = new Assignment({ asset: asset._id, assignedTo, quantity, assignedBy: req.user.id, notes })
		await a.save()
		asset.quantity = Math.max(0, asset.quantity - Number(quantity))
		asset.status = asset.quantity === 0 ? 'expended' : asset.status
		await asset.save()
		const out = await a.populate('asset')
		res.status(201).json(out)
	}catch(err){ next(err) }
})

module.exports = router
