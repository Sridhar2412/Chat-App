import React, { Fragment, useState, useEffect, useRef } from 'react'
import MessageIcon from '../../Assets/MessageIcon'
import { v4 } from 'uuid'
import SendIcon from '../../Assets/SendIcon'
import { getDatabase, ref, push, onValue, update } from "firebase/database";
import GlobalIcon from '../../Assets/Global.jsx'
import ScrollableFeed from 'react-scrollable-feed'
export default function ChatMessaging({ profile }) {
    const [msg, setMsg] = useState("")
    const [messages, setMessages] = useState([])
    const db = getDatabase();
    const scroll = useRef()
    const { user_name, chatType, _id } = profile
    const switchCollection = user_name === "Global" ? user_name : `${chatType}/${_id}`
    console.log(chatType, _id)
    const user = JSON.parse(localStorage.getItem("user"))

    const user_img = `https://ui-avatars.com/api/?name=${user?.userMail}`
    useEffect(() => {
        onValue(ref(db, `/${switchCollection}`), (res) => {
            if (res.val()) {
                console.log(chatType, _id, switchCollection)
                console.log(res.val())
                const arrData = Object.values(res.val())
                switchCollection!=="Global" && arrData.pop()
                setMessages(arrData)
            }
        })
        // eslint-disable-next-line
    }, [profile])
    async function writeUserData(e, userId, email, profile) {
        e.preventDefault()
        const obj = () => user_name === "Global" ? { email, userId, msg: msg.trim(), profile } : { msg: msg.trim(), profile: user_img, email: user?.userMail }
        if (!!msg.trim()) {
            push(ref(db, `/${switchCollection}`), obj());
        }
        setMsg("")
    }
    return (
        <div className="chat-messaging rounded-10 flex flex-col bg-white h-full">
            <form className="flex flex-col" onSubmit={(e) => {
                writeUserData(e, user?.userId, user?.userMail, profile.user_avatar)
            }}>
                {profile._id &&
                    (<div className="profile-bar w-full bg-blue-600 flex items-center py-2 px-5">
                        {user_name === "Global" && <GlobalIcon className="w-12 rounded-full" strokeColor="#fff" />}
                        {!(user_name === "Global") && <img src={profile.user_avatar} className="w-11 rounded-full" alt="" />}
                        <h1 className="text-white ml-4">{user_name}</h1>
                    </div>)
                }
                {!profile._id && (<>
                    <MessageIcon className="w-1/2 mx-auto" color="#3574ff" />
                    <h1 className="text-custom-blue text-5xl text-center">Start Chatting here!</h1>
                </>
                )
                }
                {profile._id && (
                    <>
                        <div className="chat-messaging-body flex flex-col relative flex-none overflow-y-auto">
                            <ScrollableFeed>{messages?.map((msg) => (
                                <Fragment key={v4()}>
                                    <div className="flex flex-row w-full my-2">
                                        {msg.email === user?.userMail ? (<p className="sended-msg shadow-md ml-auto">{msg.msg}</p>) : (
                                            <>
                                                <img src={msg.profile} alt="" className="w-8 rounded-full self-end ml-4" />
                                                <p className="received-msg shadow-md mr-auto">{msg.msg}</p>
                                            </>
                                        )}
                                    </div>
                                </Fragment>
                            ))}</ScrollableFeed>
                            <div className="dummy" ref={scroll}></div>
                        </div>
                    </>
                )
                }
                {
                    profile._id &&
                    (
                        <div className="msg-container w-full flex-none self-end border-t-4 border-custom-blue">
                            <div className="flex flex-row">
                                <input type="text" onChange={e => {
                                    setMsg(e.target.value)
                                }} value={msg} className="w-full py-4 px-5 rounded-b-10 focus:outline-none focus:border-blue-600" placeholder="Enter Your Message" />
                                <button type="submit" className="w-8"> <SendIcon className="send-svg" strokeWidth="2" strokeColor="#3574ff" /> </button>
                            </div>
                        </div>
                    )
                }
            </form>
        </div>
    )
}
