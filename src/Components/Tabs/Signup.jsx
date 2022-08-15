import React, { useRef, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/bootstrap.css'
import MailIcon from '../../Assets/MailIcon'
import LockIcon from '../../Assets/LockIcon'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export default function Signup({ showAlert, setShowAlert }) {
    const [mailInput, setMailInput] = useState({ value: "", isFocused: false })
    const [passwordInput, setPasswordInput] = useState({ value: "", isFocused: false })
    const focusedEle = useRef()
    function mailFocus() {
        setMailInput((prevState) => {
            return { ...prevState, isFocused: true }
        })
    }
    function mailBlur() {
        setMailInput((prevState) => {
            return { ...prevState, isFocused: false }
        })
    }
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
        setMailInput((prevState) => {
            return { ...prevState, value: e.target.value }
        })
    }
    function passwordHandle(e) {
        setPasswordInput((prevState) => {
            return { ...prevState, value: e.target.value }
        })
    }

    const firebaseAuth = (e, email, password) => {
        e.preventDefault()
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem("user", JSON.stringify({ token: user.accessToken, userMail: user.email, userId: user.uid }))
                setShowAlert({ showSuccess: true, showErr: false })
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error({ errorCode, errorMessage })
                setShowAlert({ showErr: true, showSuccess: false })
            });
    }
    return (
        <div className="mt-4">
            <form onSubmit={(e) => { firebaseAuth(e, mailInput.value, passwordInput.value) }}>
                <PhoneInput
                    country="in"
                    inputClass="font-display my-7"
                    inputProps={{
                        name: 'phone',
                        required: true,
                    }}
                />
                <div className="mail-input">
                    <MailIcon className="mail-svg" strokeWidth="1" strokeColor={mailInput.isFocused ? "#4f86ff" : "currentColor"} />
                    <input ref={focusedEle} onChange={mailHandle} onFocus={mailFocus} onBlur={mailBlur} type="mail" placeholder="jhondoe@mail.com" required={true} className="mb-7 email form-control font-display" />
                </div>
                <div className="password-input">
                    <LockIcon className="lock-svg" strokeWidth="1" strokeColor={passwordInput.isFocused ? "#4f86ff" : "currentColor"} />
                    <input ref={focusedEle} onChange={passwordHandle} onFocus={passwordFocus} onBlur={passwordBlur} type="password" placeholder="Minimum Length 8" minLength="8" required={true} className="my-7 password form-control font-display" />
                </div>
                <div className="button">
                    <button type="submit" className="block mx-auto bg-blue-500 text-white font-display px-5 py-3 signup-btn">
                        Sign Up
                    </button>
                </div>
            </form>
        </div>
    )
}
