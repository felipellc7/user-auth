const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const express = require('express')
const User = require('../models/user')
const router = express.Router()


router.post('/users/login', async (req, res) => {
  const {email, password} = req.body.user
  let user = await User.findOne({email})
  if (!user) return res.status(400).send('User or password wrong!')
  
  const validPassword = await bcrypt.compare(password, user.password)
  
  if (!validPassword) return res.status(400).send('User or password wrong!')

  const jwtToken = user.generateJWT();
  res.status(200).header('Authorization', jwtToken).send({
    _id: user._id,
    name: user.name,
    email: user.email
  })
})

module.exports = router;