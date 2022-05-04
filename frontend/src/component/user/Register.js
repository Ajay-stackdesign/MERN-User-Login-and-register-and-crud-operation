import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { clearError, register } from '../../action/userActtion'
import "./Register.scss"

const Register = () => {
    const alert = useAlert()
    const history = useHistory()
    const dispatch = useDispatch()
    const { error, isAuthenticated } = useSelector((state) => state.user)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(register(name, email, password))
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        if (isAuthenticated) {
            alert.success("succesfully register")
            history.push("/")
        }
    }, [alert, dispatch, error, history, isAuthenticated])

    return (
        <Fragment>
            <div className='register'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label style={{ color: "white" }}><center>Name</center></label>
                        <input className='text' type="text" placeholder="ennter the name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label style={{ color: "white" }}><center>Email</center></label>
                        <input className='text' type="email" placeholder='enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div>
                        <label style={{ color: "white" }}><center>Password</center></label>
                        <input className='text' type="password" placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <input className='submit' type="submit" value="submit" />
                </form>
            </div>
        </Fragment>
    )

}

export default Register