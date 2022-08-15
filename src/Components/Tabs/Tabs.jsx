import React, { useState } from 'react'
import Signup from './Signup'
import Signin from './Signin'
export default function Tabs({ showAlert, setShowAlert }) {
    const [tabs, setTabs] = useState({ signup: true, signin: false })
    const signUpClass = tabs.signup ? 'signup font-display signup-active' : 'signup font-display'
    const signInClass = tabs.signin ? 'signin font-display signin-active' : 'signin font-display'
    function signUpHandle() {
        if (tabs.signin) {
            setTabs({ signup: true, signin: false })
        }
    }
    function signInHandle() {
        if (tabs.signup) {
            setTabs({ signup: false, signin: true })
        }
    }
    return (
        <div className="tabs container bg-white max-w-498 max-h-923">
            <div className="flex flex-row justify-around">
                <div onClick={signUpHandle} className={signUpClass}>Sign Up</div>
                <div onClick={signInHandle} className={signInClass}>Sign In</div>
            </div>
            {tabs.signup && <Signup showAlert={showAlert} setShowAlert={setShowAlert} />}
            {tabs.signin && <Signin showAlert={showAlert} setShowAlert={setShowAlert} />}
        </div>
    )
}
