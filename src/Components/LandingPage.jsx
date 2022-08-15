import React, { useState } from 'react'
import Tabs from './Tabs/Tabs'
import Title from './Title'
import Alert from "./Alert/Alert"
export default function LandingPage() {
    const [showAlert, setShowAlert] = useState({ showErr: false, showSuccess: false })
    return (
        <div className="container">
            <Title color="text-white" />
            <Tabs showAlert={showAlert} setShowAlert={setShowAlert} />
            {showAlert.showErr && <Alert color="bg-red-500 text-white" msg="Invalid Details!" />}
            {showAlert.showSuccess && <Alert color="bg-green-500 text-white" msg="Successfull!" />}
        </div>
    )
}
