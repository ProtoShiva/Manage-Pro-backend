const User = require("../../models/user/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const expiryDate = new Date()
const date1 = expiryDate.setTime(expiryDate.getTime() + 12 * 60 * 60 * 1000)

const registerUser = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const user = await User.findOne({ email: email })
    if (user) {
      throw new Error("User Already exists! Please Login.")
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
      expiresIn: "12h",
    })

    return res
      .status(201)
      .cookie("token", token, { expires: new Date(Date.now() + date1) })
      .json({ success: true, createdUser })
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    })
  }
}

const userLogin = async (req, res) => {
  const { email, password } = req?.body

  try {
    const emailExists = await User.findOne({ email: email })

    if (!emailExists) {
      throw new Error("User Does not exist! Please Register.")
    }

    const user = await User.findOne({ email: email })
    const comparePassword = await bcrypt.compare(password, user?.password)

    if (!comparePassword) {
      throw new Error("Password Doesn't Match!")
    }

    const data = {
      id: user?._id,
    }

    //sign the cookie token
    const token = jwt.sign(data, process.env.APP_JWT_SECRET_KEY, {
      expiresIn: "12h",
    })

    user.password = undefined

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + date1),
        sameSite: "None",
        secure: true,
      })
      .json({
        success: true,
        user,
      })
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    })
  }
}

module.exports = { registerUser, userLogin }
