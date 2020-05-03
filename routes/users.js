const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const express = require('express')
const User = require('../models/user')
const router = express.Router()
const auth = require('../middleware/auth')

router.get('/users', auth, async (req, res) => {
  const users = await User.find()
  res.send(users)
})

router.get('/users/:id', async (req, res) => {
  const user = await User.find({_id: req.params.id})
  if (!user) return res.status(404).send('User not found')
  res.send(user)
})

router.post('/users', async (req, res) => {
  const {name, email, password} = req.body.user
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)
  const user = new User({
    name,
    email,
    password: hashPassword,
  })
  const result = await user.save()

  const jwtToken = user.generateJWT();

  res.status(201).header('Authorization', jwtToken).send({
    _id: result._id,
    name: result.name
  })
})

router.put('/users/:id', async (req, res) => {
  const {name, email, password} = req.body.user
  const user = await User.findByIdAndUpdate(req.params.id, {
    name,
    email,
    password,
  }, {
    new: true
  })
  if (!user) return res.status(404).send('User not found')
  res.status(204).send()
})

router.delete('/users/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id)
  if (!user) return res.status(404).send('User not found')
  res.status(200).send('User removed')
})

module.exports = router;