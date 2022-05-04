import { createStore, combineReducers, applyMiddleware } from "redux"

import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { bookReducer, createBookReducer, getbookReducer, getSingleBookReducer, } from "./reducer/bookReducer"
import { newUserReducer } from "./reducer/userReducer"

const reducer = combineReducers({
    get: getbookReducer,
    create: createBookReducer,
    user: newUserReducer,
    update: bookReducer,
    single: getSingleBookReducer,
})

let initialStage = {}

const middleware = [thunk]


const store = createStore(
    reducer,
    initialStage,
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store