import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { v4 } from "uuid"
import GlobalIcon from '../../Assets/Global.jsx'
import { getDatabase, ref, push, onValue } from "firebase/database";
import { signOut, getAuth } from "firebase/auth"

export default function ChatList({ setProfile }) {
    const [users, setUsers] = useState([])
    const history = useHistory()
    const user = JSON.parse(localStorage.getItem("user"))
    const db = getDatabase();
    const auth = getAuth();
    function handleLogout() {
        signOut(auth).then(() => {
            history.push("/")
        })
    }
    useEffect(() => {
        onValue(ref(db, `/`), (res) => {
            if (res.val()) {
                const chatType = Object.keys(res.val())
                chatType.shift()
                const arr = Object.values(res.val())
                arr.shift()
                const arr2 = arr.map((e) => Object.keys(e)).flat()
                const mails = arr.map((e, idx) => {
                    let userObj = e[Object.keys(e)]
                    console.log(userObj)
                    let objCopy = { ...userObj }
                    objCopy._id = arr2[idx]
                    objCopy.chatType = chatType[idx]
                    console.log(chatType[idx], arr2[idx])
                    return objCopy
                }).filter((e) => {
                    console.log()
                    return e.email.includes(user?.userMail)
                })
                console.log(mails)
                setUsers(mails)
            }
        })
    }, [])

    const user_img = `https://ui-avatars.com/api/?name=${user?.userMail}`
    return (
        <div className="chat-list bg-custom-blue w-96 h-full overflow-auto">
            <div className="dropdown">
                {/* <UserIcon className="w-12 cursor-pointer" color="white" /> */}
                <img src={`https://ui-avatars.com/api/?name=${user?.userMail}`} className="w-12 rounded-full cursor-pointer" alt="" />
                <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                    <li className="">
                        <a className="rounded bg-gray-100 hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap" href="#yash">{user?.userMail}</a>
                    </li>
                    <li className="">
                        <Link className="rounded bg-gray-100 hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap" to="/newchat">New Chat</Link>
                    </li>
                    <li className="">
                        <p onClick={handleLogout} className="cursor-pointer rounded bg-gray-100 hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap">Logout</p>
                    </li>
                </ul>
            </div>
            <button onClick={() => {
                setProfile({
                    _id: "G000",
                    user_name: "Global",
                    user_avatar: user_img,
                })
            }}
                key={v4()} className="item w-full bg-blue-300 flex items-center py-4 px-4 rounded-10 my-4">
                <GlobalIcon className="w-10 rounded-full mr-3" strokeColor="#fff" />
                <h1 className="font-semibold">Global</h1>
            </button>
            {
                users.map((item) => {
                    const currentUser = item.email.find(e => e !== user?.userMail).split("@")[0]
                    let user_img = `https://ui-avatars.com/api/?name=${currentUser}`
                    return (
                        <button key={v4()} onClick={() => {
                            setProfile({
                                _id: item._id,
                                user_name: currentUser,
                                user_avatar: user_img,
                                chatType: item.chatType
                            })
                        }}
                            className="item w-full bg-blue-300 flex items-center py-4 px-4 rounded-10 my-4">
                            <img src={user_img} className="w-10 rounded-full mr-3" alt="" />
                            <h1 className="font-semibold">{currentUser}</h1>
                        </button>
                    )
                })
            }
            {/* <div className="list absolute"> */}
            {/* {ProfileData.map((ele, idx) => {
                return (
                    <button onClick={() => {
                        setProfile(ele)
                    }}
                        key={v4()} className="item w-full bg-blue-300 flex items-center py-4 px-4 rounded-10 my-4">
                        <img src={ele.user_avatar} className="w-9 rounded-full mr-3" alt="" />
                        <h1 className="font-semibold">{ele.user_name}</h1>
                    </button>
                )
            })} */}
            {/* </div> */}
        </div>
    )
}
