const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET || 'changeme'

function authRequired(req, res, next){
  const auth = req.headers.authorization
  if(!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Missing token' })
  const token = auth.split(' ')[1]
  try{
    const payload = jwt.verify(token, secret)
    // attach minimal user info
    req.user = { id: payload.id, role: payload.role, base: payload.base }
    return next()
  }catch(err){
    return res.status(401).json({ message: 'Invalid token' })
  }
}

function requireRole(...allowed){
  return function(req, res, next){
    if(!req.user) return res.status(401).json({ message: 'Not authenticated' })
    if(allowed.length === 0) return next()
    if(allowed.includes(req.user.role)) return next()
    return res.status(403).json({ message: 'Forbidden: insufficient role' })
  }
}

module.exports = { authRequired, requireRole }
