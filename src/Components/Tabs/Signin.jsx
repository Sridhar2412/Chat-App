import React, { useRef, useState } from 'react'
import EyeIcon from '../../Assets/EyeIcon'
import EyeOffIcon from '../../Assets/EyeOffIcon'
// import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Signin({ showAlert, setShowAlert }) {
    const [mailInput, setMailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState({ value: "", isFocused: false })
    const [toggle, setToggle] = useState(true)
    const focusedEle = useRef()
    function passwordFocus() {
        setPasswordInput((prevState) => {
            return { ...prevState, isFocused: true }
        })
    }
    function passwordBlur() {
        setPasswordInput((prevState) => {
            return { ...prevState, isFocused: false }
        })
    }
    function mailHandle(e) {
        setMailInput(e.target.value)
    }
    function passwordHandle(e) {
        setPasswordInput((prevState) => {
            return { ...prevState, value: e.target.value }
        })
    }
    function toggleShowPassword() {
        if (toggle) {
            setToggle(false)
            focusedEle.current.type = "text"
        } else {
            setToggle(true)
            focusedEle.current.type = "password"
        }
    }

    function firebaseSignin(e, email, password) {
        e.preventDefault()
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem("user", JSON.stringify({ token: user.accessToken, userMail: user.email, userId: user.uid }))
                setShowAlert({ showSuccess: true, showErr: false })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log({ errorCode, errorMessage })
                setShowAlert({ showErr: true, showSuccess: false })
            });
    }

    return (
        <div className="mt-8">
            <form onSubmit={(e) => { firebaseSignin(e, mailInput, passwordInput.value) }}>
                <div className="mail-input">
                    <input onChange={mailHandle} value={mailInput} type="mail" placeholder="Enter Username or Number" required className="mb-7 sign-email form-control font-display" />
                </div>
                <div className="password-input">
                    {toggle && <span onClick={toggleShowPassword}><EyeOffIcon className="eye-svg" strokeWidth="1" strokeColor={passwordInput.isFocused ? "#4f86ff" : "currentColor"} /></span>}
                    {!toggle && <span onClick={toggleShowPassword}><EyeIcon className="eye-svg" strokeWidth="1" strokeColor={passwordInput.isFocused ? "#4f86ff" : "currentColor"} /></span>}
                    <input ref={focusedEle} value={passwordInput.value} onChange={passwordHandle} onFocus={passwordFocus} onBlur={passwordBlur} type="password" placeholder="Minimum Length 8" minLength="8" required className="my-7 sign-password form-control font-display" />
                </div>
                <div className="button">
                    <button type="submit" className="block mx-auto text-center bg-blue-500 text-white font-display px-5 py-3 signup-btn">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    )
}
