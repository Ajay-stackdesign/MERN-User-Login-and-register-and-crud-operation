// const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))
app.use(fileUpload())

const bookRoute = require("./routes/bookRoute")
const userRoute = require("./routes/userRoutes")
app.use("/api/v1", bookRoute)
app.use("/api/v1", userRoute)

module.exports = app