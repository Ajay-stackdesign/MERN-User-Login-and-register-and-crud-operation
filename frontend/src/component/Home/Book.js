import React, { Fragment } from 'react'
import "./Book.scss"

const Book = ({ books }) => {
    return (
        <Fragment>
            <div className='div'>
                <div className='flex'>
                    <h5>{books.name}</h5>
                    <img src={books.images[0].url} alt={books.name} />
                    <p>{books.author}</p>
                    <div className='divflex2'>
                        <p>{books.description}</p>
                        <p>₹{books.price}</p>
                        <p>{books.available}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Book