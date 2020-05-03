const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 2,
    maxlength: 99,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 99,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 99,
  },
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
})

userSchema.methods.generateJWT = function() {
  return jwt.sign({_id: this._id, name: this.name, email: this.email}, process.env.SECRET_KEY_JWT_EX_AUTH, {expiresIn: '30d'})
}

const User = mongoose.model('user', userSchema)

module.exports = User