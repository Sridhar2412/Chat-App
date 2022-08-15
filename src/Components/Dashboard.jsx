import React, { useState } from 'react'
import ChatList from './Chat/ChatList'
import ChatMessaging from './Chat/ChatMessaging'
export default function Dashboard() {
    const [profile, setProfile] = useState({})
    return (
        <>
            <div className="dashboard-wrapper flex justify-center items-center">
                <div className="chat-wrapper flex flex-row bg-white rounded-10 shadow-xl relative">
                    <ChatList setProfile={setProfile} />
                    <ChatMessaging profile={profile} />
                </div>
            </div>
        </>
    )
}