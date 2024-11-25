const cookieParser = require("cookie-parser")
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv").config()
const { connectDb } = require("./database/db")
const userRoutes = require("./routes/users/userRoute.js")

const app = express()
const PORT = 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors({ origin: true, credentials: true }))

app.get("/", (req, res) => {
  res.send("hello user")
})

app.use("/api/user", userRoutes)

connectDb()

app.listen(PORT, () => console.log(`server listening at port ${PORT}`))