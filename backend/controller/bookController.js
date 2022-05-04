
const Book = require("../model/bookModel")
const cloudinary = require("cloudinary")

exports.createBook = async (req, res, next) => {
    try {

        let images = [];

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images;
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "book",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }

        req.body.images = imagesLinks;
        console.log(imagesLinks)

        const book = await Book.create(req.body)

        res.status(200).json({
            success: true,
            book
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.getBook = async (req, res, next) => {
    try {
        const books = await Book.find()

        res.status(200).json({
            success: true,
            books
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.getSingleDetails = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id)

        if (!book) {
            return res.status(500).json("Book not found")
        }

        res.status(200).json({
            success: true,
            book
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.updateBook = async (req, res, next) => {
    try {
        let book = await Book.findById(req.params.id)

        if (!book) {
            return res.status(500).json("book not found")
        }

        let images = []

        if (typeof req.body.images === "string") {
            images.push(req.body.images);
        } else {
            images = req.body.images
        }

        if (images !== undefined) {
            for (let i = 0; i < book.images.length; i++) {
                await cloudinary.v2.uploader.destroy(book.images[i].public_id);
            }

            const imagesLinks = []

            for (let i = 0; i < images.length; i++) {
                const result = await cloudinary.v2.uploader.upload(images[i], {
                    folder: "book"
                });

                imagesLinks.push({
                    public_id: result.public_id,
                    url: result.secure_url,
                })
            }

            req.body.images = imagesLinks;
        }


        book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: true
        })

        res.status(200).json({
            success: true,
            book
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.deleteBook = async (req, res, next) => {
    try {
        let book = await Book.findById(req.params.id)

        if (!book) {
            return res.status(500).json("book not found")
        }

        for (let i = 0; i < book.images.length; i++) {
            await cloudinary.v2.uploader.destroy(book.images[i].public_id);
        }

        await book.remove()

        res.status(200).json({
            success: true,
        })

    } catch (err) {
        res.status(500).json(err)
    }
}