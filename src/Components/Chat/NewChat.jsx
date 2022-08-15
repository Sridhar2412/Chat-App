import React, { useState, useEffect } from 'react'
import { getDatabase, ref, push, onValue } from "firebase/database";

export default function NewChat() {
    const [radio, setRadio] = useState("")
    const [email, setEmail] = useState("")
    const [data, setData] = useState({})
    const db = getDatabase();
    const user = JSON.parse(localStorage.getItem("user"))
    let numOfPrivateChats = [], numOfGroupChats = [], newCollectionName = ""
    function handleRadio(e) {
        setRadio(e.target.textContent || e.target.value)
    }

    useEffect(() => {
        let collectionsObject
        onValue(ref(db, `/`), (res) => {
            if (res.val()) {
                collectionsObject = Object.keys(res.val())

                let arr = res.val()
                const getMails = collectionsObject.filter((ele, idx) => {
                    if (typeof arr[ele][Object.keys(arr[ele])[0]].email === 'object') {
                        return arr[ele][Object.keys(arr[ele])[0]].email.includes(user?.userMail) && ele
                    }
                })
                collectionsObject = getMails
                console.log(collectionsObject)
            }
        })
        numOfPrivateChats = collectionsObject.map(privateEle => {
            console.log(privateEle)
            let count = 0
            if (privateEle.includes("PrivateChat")) {
                count += 1
            }
            console.log(count)
            return count
        })
        numOfGroupChats = collectionsObject.map(groupEle => {
            console.log(groupEle)
            let count = 0
            if (groupEle.includes("GroupChat")) {
                count += 1
            }
            console.log(count)
            return count
        })
        numOfPrivateChats = numOfPrivateChats.reduce((acc, curr) => {
            if (!!curr) {
                return acc + curr
            }
        })
        numOfGroupChats = numOfGroupChats.reduce((acc, curr) => {
            if (!!curr) {
                return acc + curr
            } else {
                return 0
            }
        })
        newCollectionName = radio === "Private Chat" ? (`${radio.replace(" ", "")}${numOfPrivateChats}`) : (`${radio.replace(" ", "")}${numOfGroupChats}`)
        setData({ newCollectionName, numOfPrivateChats, numOfGroupChats })
    }, [radio])
    async function writeUserData(e) {
        e.preventDefault()
        push(ref(db, `/${data.newCollectionName}`), {
            email: [user?.userMail, email]
        });
    }
    return (
        <div className="new-chat-wrapper">
            <div className="mt-10 container flex flex-col justify-between items-center">
                <h1 className="text-center  text-7xl font-bold text-custom-blue uppercase tracking-wide">Create New Chat</h1>
                <form onSubmit={writeUserData} className="mt-12">
                    <div className="mb-7">
                        <input onChange={handleRadio} className="form-radio w-8 h-8 align-baseline" value="Private Chat" checked={radio === "Private Chat"} type="radio" required name="privateChat" />
                        <label onClick={handleRadio} className="ml-2 text-3xl cursor-pointer" htmlFor="privateChat">Private Chat</label>
                        <input onChange={handleRadio} className="form-radio w-8 h-8 align-baseline ml-6" value="Group Chat" checked={radio === "Group Chat"} type="radio" required name="privateChat" />
                        <label onClick={handleRadio} className="ml-2 text-3xl cursor-pointer" htmlFor="groupChat">Group Chat</label>
                    </div>
                    <input type="text" value={data.newCollectionName} className="form-input my-3 text-2xl rounded w-full" disabled />
                    <input type="email" placeholder="Enter Mail" className="form-input my-3 text-2xl rounded w-full" onChange={e => {
                        setEmail(e.target.value)
                    }} value={email} required />
                    <button type="submit" className="block w-full my-3 mx-auto bg-blue-500 text-white font-display px-5 py-3 rounded">Submit</button>
                </form>
            </div>
        </div>
    )
}
