import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, getBook } from '../../action/bookAction'
import Book from "./Book.js"
import "./Homes.scss"

const Homes = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const { error, loading, books } = useSelector((state) => state.get)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError)
        }
        dispatch(getBook())
    }, [alert, dispatch, error])

    return (
        <Fragment>
            {loading ? "something went wrong" : (<Fragment>
                <div className='hello'>
                    {books &&
                        books.map((book) => (
                            <Book key={book._id} books={book} />
                        ))
                    }
                </div>
            </Fragment>)}
        </Fragment>
    )
}

export default Homes