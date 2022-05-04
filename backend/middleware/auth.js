
const jwt = require("jsonwebtoken")
const User = require("../model/userModel")
const catchAyncError = require("./catchAsyncError")

exports.isAuthenticatedUser = catchAyncError(async (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return res.status(500).json("PLease Login to Access this resources")
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decodedData.id)
})