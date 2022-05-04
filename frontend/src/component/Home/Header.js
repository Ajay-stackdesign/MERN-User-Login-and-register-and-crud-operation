import React, { Fragment } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../action/userActtion'
import "./Header.scss"

const Header = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const { isAuthenticated } = useSelector((state) => state.user)

    const guestLinks = (
        <Fragment>
            <Link style={{ listStyleType: "none", color: "black", padding: "20px", textDecoration: "none" }} to="/login" className='link'>Login</Link>
            <Link style={{ listStyleType: "none", color: "black", padding: "20px", textDecoration: "none" }} className="link" to="/register" >register</Link>
        </Fragment>
    )
    const handleCLick = () => {
        dispatch(logoutUser())
        alert.success("Logout successFully")
    }
    return (
        <Fragment>
            <div className='header'>
                <div className='header__left'>
                    <Link to="/" className='link'><img src='https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010__340.jpg' alt="header_logo" /></Link>
                </div>
                <div className="header__middle">
                    <ul className='header__middleOne'>
                        <li><Link className="link" to="/" >Home</Link></li>
                        <li><Link className="link" to="/contact" >Contact</Link></li>
                        <li><Link className="link" to="/getall" >Getall</Link></li>
                        <li><Link className="link" to="/add" >Add Book</Link></li>
                    </ul>
                </div>
                <div className='header__right'>
                    <li>{isAuthenticated ? (<button style={{ background: "black", color: "white", border: "none", padding: "15px", borderRadius: "10px", cursor: "pointer" }} onClick={handleCLick}>Logout</button>) : guestLinks}</li>
                    {/* <li>{isAuthenticated ? <Link to="/register" className='link'>SIGN Up</Link> : ""}</li> */}
                </div>
            </div>
        </Fragment>
    )
}

export default Header