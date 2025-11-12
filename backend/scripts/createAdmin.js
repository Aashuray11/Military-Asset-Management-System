require('dotenv').config()
const mongoose = require('mongoose')
const User = require('../models/User')

async function main(){
  const uri = process.env.MONGODB_URI
  if(!uri){
    console.error('MONGODB_URI not set in env')
    process.exit(1)
  }
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  console.log('Connected to MongoDB for admin creation')

  const email = process.env.ADMIN_EMAIL || 'admin@local'
  const pw = process.env.ADMIN_PW || 'Admin123!'
  const name = process.env.ADMIN_NAME || 'Administrator'

  let user = await User.findOne({ email })
  if(user){
    console.log('Admin user already exists:', email)
    process.exit(0)
  }

  user = new User({ name, email, password: pw, role: 'admin' })
  await user.save()
  console.log('Created admin user:', email, 'password:', pw)
  process.exit(0)
}

main().catch(err => { console.error(err); process.exit(1) })
