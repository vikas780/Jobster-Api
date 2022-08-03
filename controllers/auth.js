const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
  const user1 = await User.create({ ...req.body })
  const token = user1.createJwt()
  res.status(StatusCodes.CREATED).json({ user1: { name: user1.name }, token })
}

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide the details')
  }
  const user = await User.findOne({ email })

  if (!user) {
    throw new UnauthenticatedError('Invalid Credantials')
  }

  const isPass = await user.comparePass(password)

  if (!isPass) {
    throw new UnauthenticatedError('Invalid Credantials')
  }

  const token = user.createJwt()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
  register,
  login,
}
