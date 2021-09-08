import React, { useState, useEffect } from 'react'
import "./SidebarChat.css"
import { Avatar } from '@material-ui/core';
import { Link } from "react-router-dom"
import db from "./firebase";

function SidebarChat({addNewChat, id, name}) {
    const [seed, setSeed] = useState('');
    const [texts, setTexts] = useState("")
    useEffect(() => {
       setSeed(Math.floor(Math.random() * 5000))
    },[])
    const createChat = () => {
        const roomName = prompt("please enter name for chat");
        if(roomName){
            db.collection('rooms').add({
                name:roomName
            })
        }
      }
      useEffect(() =>{
          if(id){
              db.collection('rooms')
              .doc(id)
              .collection('messages')
              .orderBy('timestamp', 'desc')
              .onSnapshot(onSnapshot => (
                  setTexts(onSnapshot.docs.map(doc => 
                    doc.data()))
              ))
          }
      },[id])
    return !addNewChat ? (
        <Link to={`/rooms/${id}`} style={{textDecoration:"none", color:"black"}}>
        <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}/>
            <div className="sidebarChat__info">
                <h4>{name}</h4>
                <p>{texts[0]?.message}</p>
            </div>
        </div>
        </Link>
    ):(
        <h3 onClick={createChat} className="addNewChat">Add new chat</h3>
    )
}

export default SidebarChat
