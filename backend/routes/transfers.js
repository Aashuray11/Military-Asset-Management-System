const express = require('express');
const router = require('express').Router()
const { authRequired, requireRole } = require('../middleware/authMiddleware')
const Transfer = require('../models/Transfer')
const Asset = require('../models/Asset')

// GET /api/transfers
router.get('/', authRequired, async (req, res, next) => {
	try{
		const list = await Transfer.find().populate('asset').sort({ executedAt: -1 }).lean()
		res.json(list)
	}catch(err){ next(err) }
})

// POST /api/transfers - only admin/logistics
router.post('/', authRequired, requireRole('admin','logistics'), async (req, res, next) => {
	try{
		const { asset: assetId, fromBase, toBase, quantity = 1, notes } = req.body || {}
		if(!assetId || !fromBase || !toBase || !quantity) return res.status(400).json({ message: 'Missing fields' })
		const asset = await Asset.findById(assetId)
		if(!asset) return res.status(404).json({ message: 'Asset not found' })
		// create transfer
		const t = new Transfer({ asset: asset._id, fromBase, toBase, quantity, executedBy: req.user.id, notes })
		await t.save()
		// decrease asset quantity
		asset.quantity = Math.max(0, asset.quantity - Number(quantity))
		await asset.save()
		const out = await t.populate('asset')
		res.status(201).json(out)
	}catch(err){ next(err) }
})

module.exports = router
