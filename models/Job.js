const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please Provide name sir'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please Provide position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User', //Which model we are refering eg here type will come from User model
      required: [true, 'Please Provide User'],
    },
  },
  { timestamps: true } //gives us createdAt and updateAt
)

// UserSchema.pre('save', async function () {
//   const salt = await bcrypt.genSalt(10) // Salts use to genrate random bytes
//   this.password = await bcrypt.hash(this.password, salt)
// })
// UserSchema.methods.createJwt = function () {
//   return jwt.sign(
//     { userId: this._id, name: this.name },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: process.env.JWT_LIFETIME,
//     }
//   )
// }
// UserSchema.methods.comparePass = async function (pass) {
//   const isMatch = await bcrypt.compare(pass, this.password)
//   return isMatch
// }

module.exports = mongoose.model('Job', JobSchema)
