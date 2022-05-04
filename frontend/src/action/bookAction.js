import {
    CREATE_BOOK_REQUEST
    , CREATE_BOOK_SUCCESS,
    CREATE_BOOK_FAIL,
    CLEAR_ERROR,
    GETBOOK_FAIL,
    GETBOOK_REQUEST,
    GETBOOK_SUCCESS,
    DELETE_BOOK_FAIL,
    DELETE_BOOK_REQUEST,
    DELETE_BOOK_SUCCESS,
    UPDATE_BOOK_REQUEST,
    UPDATE_BOOK_SUCCESS,
    UPDATE_BOOK_FAIL,
    GETSINGLE_BOOK_FAIL,
    GETSINGLE_BOOK_REQUEST,
    GETSINGLE_BOOK_SUCCESS
} from "../constants/bookConstants"
import axios from "axios"

export const getBook = () => async (dispatch) => {
    try {
        dispatch({ type: GETBOOK_REQUEST })

        const { data } = await axios.get("/api/v1/books")

        dispatch({
            type: GETBOOK_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: GETBOOK_FAIL,
            payload: error.response.data.message
        })
    }
}

export const createBook = (productData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_BOOK_REQUEST });

        const config = {
            headers: { "Content-Type": "application/json" },
        };

        const { data } = await axios.post(
            `/api/v1/add`,
            productData,
            config
        );
        console.log(data)

        dispatch({
            type: CREATE_BOOK_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_BOOK_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getSingleBook = (id) => async (dispatch) => {
    try {
        dispatch({ type: GETSINGLE_BOOK_REQUEST })

        const { data } = await axios.get(`/api/v1/single/${id}`)

        dispatch({
            type: GETSINGLE_BOOK_SUCCESS,
            payload: data.book
        })
    } catch (error) {
        dispatch({
            type: GETSINGLE_BOOK_FAIL,
            payload: error.response.data.message
        })

    }
}


// export const updateBook = (id, productData) => async (dispatch) => {
//     try {
//         dispatch({ type: UPDATE_BOOK_REQUEST });

//         const config = {
//             headers: { "Content-Type": "application/json" },
//         };

//         const { data } = await axios.put(
//             `/api/v1/update/${id}`,
//             productData,
//             config
//         );

//         dispatch({
//             type: UPDATE_BOOK_SUCCESS,
//             payload: data.success,
//         });
//     } catch (error) {
//         dispatch({
//             type: UPDATE_BOOK_FAIL,
//             payload: error.response.data.message,
//         });
//     }
// };
export const updateBook = (id, productData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_BOOK_REQUEST
        })
        const config = { headers: { "Content-Type": "application/json" } }

        const { data } = await axios.put(`/api/v1/update/${id}`, productData, config)

        dispatch({
            type: UPDATE_BOOK_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_BOOK_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteBook = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_BOOK_REQUEST
        })

        const { data } = await axios.delete(`/api/v1/delete/${id}`)

        dispatch({
            type: DELETE_BOOK_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: DELETE_BOOK_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR })
}