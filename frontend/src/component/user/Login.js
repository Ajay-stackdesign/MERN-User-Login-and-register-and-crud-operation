import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { clearError, login } from '../../action/userActtion'
import "./Login.scss"

const Login = () => {
    const history = useHistory()
    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, isAuthenticated, error } = useSelector((state) => state.user)
    console.log(isAuthenticated)

    const [email, setEmail] = useState("")
    const [password, setPassord] = useState("")
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (isAuthenticated) {
            history.push("/")
            alert.success("Login SucccessFully!")
        }
    }, [alert, dispatch, error, history, isAuthenticated])

    const handdleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (
        <Fragment>
            {loading ? ("Invalid Email or password") : (<Fragment>
                <div className='register'>
                    <form onSubmit={handdleSubmit}>
                        <label><center>Email</center></label>
                        <input className='text' type="email" required placeholder="enter the email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label><center>Password</center></label>
                        <input className='text' type="password" required placeholder='enter password' value={password} onChange={(e) => setPassord(e.target.value)} />

                        <input className='submit' type="submit" value="submit" />
                    </form>
                </div>
            </Fragment>)}
        </Fragment>
    )
}

export default Login