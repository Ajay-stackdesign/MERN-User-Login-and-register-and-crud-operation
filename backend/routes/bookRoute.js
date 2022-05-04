const express = require("express")
const { createBook, getBook, updateBook, deleteBook, getSingleDetails } = require("../controller/bookController")

const router = express.Router()

router.route("/add").post(createBook)
router.route("/books").get(getBook)
router.route("/single/:id").get(getSingleDetails)
router.route("/update/:id").put(updateBook)
router.route("/delete/:id").delete(deleteBook)



module.exports = router