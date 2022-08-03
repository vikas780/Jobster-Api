const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Provide name sir'],
    minlength: 3,
    maxlength: 25,
  },
  email: {
    type: String,
    required: [true, 'Please Provide email'],

    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide values',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please Provide password'],
    minlength: 6,
  },
})

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10) // Salts use to genrate random bytes
  this.password = await bcrypt.hash(this.password, salt)
})
UserSchema.methods.createJwt = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
}
UserSchema.methods.comparePass = async function (pass) {
  const isMatch = await bcrypt.compare(pass, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)
