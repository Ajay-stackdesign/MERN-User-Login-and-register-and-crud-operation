import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from '@mui/material/Button';

import { useAlert } from "react-alert";
// import { Button } from "@material-ui/core";
import { clearError, getSingleBook, updateBook } from "../../action/bookAction";
import { UPDATE_BOOK_RESET } from "../../constants/bookConstants";

const UpdateBook = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, book } = useSelector((state) => state.single);

    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.update);

    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [available, setAvailable] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const bookId = match.params.id;

    useEffect(() => {
        if (book && book._id !== bookId) {
            dispatch(getSingleBook(bookId));
        } else {
            setName(book.name);
            setAuthor(book.author);
            setDescription(book.description);
            setPrice(book.price);
            setAvailable(book.available);
            setOldImages(book.images);
        }
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearError());
        }

        if (isUpdated) {
            alert.success("Product Updated Successfully");
            history.push("/");
            dispatch({ type: UPDATE_BOOK_RESET });
        }
    }, [dispatch, alert, error, history, isUpdated, updateError, book, bookId]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("author", author);
        myForm.set("description", description);
        myForm.set("price", price);
        myForm.set("available", available);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(updateBook(bookId, myForm));
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <div className="addcar">
                <form
                    className="createProductForm"
                    encType="multipart/form-data"
                    onSubmit={updateProductSubmitHandler}
                >
                    <h1>Create Product</h1>

                    <div>

                        <input
                            className="text"
                            type="text"
                            placeholder="enter name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <input className="text" type="number" placeholder="enter number"
                            required value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div>

                        <input
                            className="text"
                            type="text"
                            placeholder="author"
                            required
                            onChange={(e) => setAuthor(e.target.value)}
                            value={author}
                        />
                    </div>

                    <div>


                        <textarea
                            className="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            cols="30"
                            rows="1"
                        ></textarea>
                    </div>


                    <div>
                        <input
                            className="text"
                            type="text"
                            placeholder="avaialable"
                            required
                            onChange={(e) => setAvailable(e.target.value)}
                            value={available}
                        />
                    </div>

                    <div id="createProductFormFile">
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={updateProductImagesChange}
                            multiple
                        />
                    </div>

                    <div id="createProductFormImage">
                        {oldImages &&
                            oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt="Old Product Preview" />
                            ))}
                    </div>

                    <div id="createProductFormImage">
                        {imagesPreview.map((image, index) => (
                            <img key={index} src={image} alt="Product Preview" />
                        ))}
                    </div>

                    <Button
                        className="submit"
                        id="createProductBtn"
                        type="submit"
                        disabled={loading ? true : false}
                    >
                        update
                    </Button>
                </form>
            </div>
        </Fragment>
    );
};

export default UpdateBook;