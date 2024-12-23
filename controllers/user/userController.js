const User = require("../../models/user/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const ErrorHandler = require("../../utils/customError")
const { asyncHandler } = require("../../utils/tryCatch")

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body

  const user = await User.findOne({ email: email })
  if (user) {
    return next(new ErrorHandler("User Already exists! Please Login.", 404))
  }

  const salt = await bcrypt.genSalt(10)

  const saltPassword = await bcrypt.hash(password, salt)

  const newUser = await User.create({
    name: name,
    email: email,
    password: saltPassword,
  })

  const createdUser = newUser
  createdUser.password = undefined

  const data = {
    id: newUser?._id,
  }
  const token = jwt.sign(data, process.env.APP_JWT_SECRET_KEY, {
    expiresIn: "25s",
  })

  return res
    .status(201)
    .cookie("token", token, {
      expires: new Date(Date.now() + 1000 * 25),
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    })
    .json({ success: true, token, createdUser })
})

const userLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req?.body

  const emailExists = await User.findOne({ email: email })

  if (!emailExists) {
    return next(new ErrorHandler("User Does not exist! Please Register.", 404))
  }

  const user = await User.findOne({ email: email })
  const comparePassword = await bcrypt.compare(password, user?.password)

  if (!comparePassword) {
    return next(new ErrorHandler("Password Doesn't Match!", 404))
  }

  const data = {
    id: user?._id,
  }

  //sign the cookie token
  const token = jwt.sign(data, process.env.APP_JWT_SECRET_KEY, {
    expiresIn: "25s",
  })

  user.password = undefined

  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(Date.now() + 1000 * 25),
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    })
    .json({
      success: true,
      token,
      user,
    })
})

const getUserDetails = asyncHandler(async (req, res, next) => {
  const userId = req.id

  const user = await User.findById(userId, "-password")

  if (!user) return next(new ErrorHandler("User not found!", 404))
  return res.status(200).json({ success: true, user })
})

module.exports = { registerUser, userLogin, getUserDetails }
