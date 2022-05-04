import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, createBook } from '../action/bookAction'


const Home = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, success, error } = useSelector((state) => state.create)
    const [name, setName] = useState("")
    const [author, setAuthor] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [available, setAvailable] = useState("")
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = ([])

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (success) {
            alert.success("created new Book")
        }
    }, [alert, dispatch, error, success])

    const handleSubmit = (e) => {
        e.preventDefault()

        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("author", author)
        myForm.set("desctiption", description)
        myForm.set("price", price)
        myForm.set("available", available)

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(createBook(myForm));
    }

    const createBookImages = (e) => {
        const files = Array.from(e.target.files[0]);//Array from creates a copy of an array

        setImages([]);
        setImagesPreview([]);

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
    }
    return (
        <Fragment>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className='home__name'>
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='home__author'>
                    <label>Author</label>
                    <input type="text" name="author" placeholder="Enter Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className='home__description'>
                    <label>Description</label>
                    <textarea cols="30"
                        rows="1" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className='home__price'>
                    <label>price</label>
                    <input type="number" name="price" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className='home__available'>
                    <label>available</label>
                    <input type="text" name="available" placeholder="" value={available} onChange={(e) => setAvailable(e.target.value)} />
                </div>
                <div id="createProductFormFile">
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={createBookImages}
                        multiple
                    />
                </div>

                <div id="createProductFormImage">
                    {imagesPreview.map((image, index) => (
                        <img key={index} src={image} alt="Product Preview" />
                    ))}
                </div>

                <button
                    id="createProductBtn"
                    type="submit"
                    disabled={loading ? true : false}
                >
                    Create
                </button>
            </form>
        </Fragment>
    )
}

export default Home