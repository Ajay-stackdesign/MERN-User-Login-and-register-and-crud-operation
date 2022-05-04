import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { clearError, createBook } from '../../action/bookAction'
import { CREATE_BOOK_RESET } from '../../constants/bookConstants'
import "./AddBook.scss"

const AddBook = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const alert = useAlert()
    const { loading, error, success } = useSelector((state) => state.create)

    const [name, setName] = useState("")
    const [author, setAuthor] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [available, setAvailable] = useState("")
    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("aaaa")
        const myForm = new FormData()

        myForm.set("name", name)
        myForm.set("author", author)
        myForm.set("description", description)
        myForm.set("price", price)
        myForm.set("available", available)

        images.forEach((image) => {
            myForm.append("images", image)
        })
        dispatch(createBook(myForm))
    }
    // const handleImages = (e) => {
    //     setfileName(e.target.files[0])
    // }

    // useEffect(() => {
    //     if (error) {
    //         alert.error(error)
    //         dispatch(clearError())
    //     }
    //     if (success) {
    //         history.push("/")
    //         alert.success("add images")
    //         dispatch({ type: CREATE_BOOK_RESET })
    //     }
    // }, [alert, dispatch, error, history, success])

    const createImagesChange = (e) => {
        const files = Array.from(e.target.files);//Array from creates a copy of an array

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    console.log(reader.readyState)
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    }
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (success) {
            history.push("/")
            alert.success("add images")
            dispatch({ type: CREATE_BOOK_RESET })
        }
    }, [alert, dispatch, error, history, success])
    return (
        <Fragment>
            <div className='addcar'>
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <label><center>Name</center></label>
                    <input
                        className='text'
                        type="text"
                        placeholder="enter name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label><center>Author</center></label>
                    <input
                        className='text'
                        type="text"
                        placeholder="enter the author name"
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    <label><center>Description</center></label>
                    <textarea
                        className='text'
                        placeholder='please netr the decription'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        cols="30" rows="1"
                    />
                    <label><center>Price</center></label>
                    <input
                        className='text'
                        type='number'
                        placeholder="enter the nuber"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <label><center>Available</center></label>
                    <input
                        className='text'
                        type="text"
                        placeholder='enter the avialabillity'
                        required
                        value={available}
                        onChange={(e) => setAvailable(e.target.value)}
                    />
                    <input style={{ marginTop: "20px" }} type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={createImagesChange}
                        multiple
                    />
                    <div id="createProductFormImage">
                        {imagesPreview.map((image, index) => (
                            <img key={index} src={image} alt="Product Preview" />
                        ))}
                    </div>
                    <button
                        className='submit'
                        type="submit"
                        disabled={loading ? true : false}
                    >submit</button>
                </form>
            </div>
        </Fragment>
    )
}

export default AddBook