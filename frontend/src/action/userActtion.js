import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    CLEAR_ERROR,
    LOGOUT_USER_FAIL,
    LOGOUT_USER_SUCCESS
} from "../constants/userConstants"
import axios from "axios"


export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_USER_REQUEST
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post("/api/v1/register",
            { name, email, password }, config
        )

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_USER_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post("/api/v1/login", {
            email, password
        }, config)

        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error.response.data.message,
        })
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        await axios.get("/api/v1/logout")

        dispatch({ type: LOGOUT_USER_SUCCESS, })
    } catch (error) {

        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearError = () => async (dispatch) => {
    dispatch(CLEAR_ERROR())
}