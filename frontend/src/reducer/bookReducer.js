import { CLEAR_ERROR, CREATE_BOOK_FAIL, CREATE_BOOK_REQUEST, CREATE_BOOK_RESET, CREATE_BOOK_SUCCESS, DELETE_BOOK_FAIL, DELETE_BOOK_REQUEST, DELETE_BOOK_RESET, DELETE_BOOK_SUCCESS, GETBOOK_FAIL, GETBOOK_REQUEST, GETBOOK_SUCCESS, GETSINGLE_BOOK_FAIL, GETSINGLE_BOOK_REQUEST, GETSINGLE_BOOK_SUCCESS, UPDATE_BOOK_FAIL, UPDATE_BOOK_REQUEST, UPDATE_BOOK_RESET, UPDATE_BOOK_SUCCESS } from '../constants/bookConstants'

export const getbookReducer = (state = { books: [] }, action) => {
    switch (action.type) {
        case GETBOOK_REQUEST:
            return {
                loading: true,
                ...state,
            }
        case GETBOOK_SUCCESS:
            return {
                loading: false,
                books: action.payload.books
            }
        case GETBOOK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const getSingleBookReducer = (state = { book: {} }, action) => {
    switch (action.type) {
        case GETSINGLE_BOOK_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GETSINGLE_BOOK_SUCCESS:
            return {
                loading: false,
                book: action.payload
            }
        case GETSINGLE_BOOK_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}


export const createBookReducer = (state = { book: {} }, action) => {
    switch (action.type) {
        case CREATE_BOOK_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_BOOK_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                book: action.payload.book
            }
        case CREATE_BOOK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CREATE_BOOK_RESET:
            return {
                ...state,
                success: false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}


export const bookReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_BOOK_REQUEST:
        case UPDATE_BOOK_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case DELETE_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_BOOK_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            }
        case DELETE_BOOK_FAIL:
        case UPDATE_BOOK_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_BOOK_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        case UPDATE_BOOK_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}