const jwt = require("jsonwebtoken")
const User = require("../models/user/user.model.js")

const userAuth = async (req, res, next) => {
  //check and get the token/cookie
  const token = req?.cookies.token

  try {
    if (!token) {
      return res.status(401).json({
        message: "No entry without authentication!",
      })
    }

    const user = jwt.verify(token, process.env.APP_JWT_SECRET_KEY)

    const userFound = await User.findById(user.id).select("-password")

    req.user = userFound
  } catch (error) {
    return res.json({ message: "Error at Authentication", error })
  }

  next()
}

module.exports = userAuth
