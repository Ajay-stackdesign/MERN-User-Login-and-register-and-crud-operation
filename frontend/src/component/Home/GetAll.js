import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { clearError, deleteBook } from '../../action/bookAction'
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button'
import { DELETE_BOOK_RESET } from '../../constants/bookConstants';
import { useAlert } from 'react-alert';

const GetAll = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const alert = useAlert()
    const { error, books } = useSelector((state) => state.get)
    console.log(books)
    const { error: deleteError, isDeleted } = useSelector((state) => state.update)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (deleteError) {
            alert.error(error)
            dispatch(clearError())
        }
        if (isDeleted) {
            alert.success("Book delete SuccessFully")
            history.push("/getall")
            dispatch({ type: DELETE_BOOK_RESET })
        }
    }, [alert, deleteError, dispatch, error, history, isDeleted])

    const deleteBookHandler = (id) => {
        dispatch(deleteBook(id))
    }
    let columns = [
        { field: "id", headerName: "BookId", minWidth: 200, flex: 0.5 },
        {
            field: "name", headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "author",
            headerName: "Author",
            minWidth: 150,
            flex: 1,
        },
        {
            field: "description",
            headerName: "Description",
            minWidth: 150,
            flex: 1
        },
        {
            field: "price",
            headerName: "Price",
            type: Number,
            minWidth: 150,
            flex: 1
        },
        {
            field: "available",
            headerName: "available",
            minWidth: 150,
            flex: 1
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/update/${params.getValue(params.id, "id")}`}>
                            button
                        </Link>

                        <Button
                            onClick={() =>
                                deleteBookHandler(params.getValue(params.id, "id"))
                            }
                        >
                            delete
                        </Button>
                    </Fragment>
                );
            },
        },
    ]

    const rows = []
    books &&
        books.forEach((item) => {
            rows.push({
                id: item._id,
                name: item.name,
                author: item.author,
                description: item.description,
                price: item.price,
                available: item.available
            })
        })


    return (
        <Fragment>
            <div className='get'>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="bookList"
                    autoHeight
                />
            </div>
        </Fragment>
    )
}

export default GetAll