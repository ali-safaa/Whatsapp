import React, { useState, useEffect } from 'react'
import "./Sidebar.css";
import { Avatar } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import { IconButton } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from "./SidebarChat"
import db from "./firebase";
import { useStateValue } from './Stateprovider';

function Sidebar() {
    const [rooms, setRooms] = useState([])
    const [{ user }] = useStateValue();

    useEffect(() => {
        db.collection("rooms").onSnapshot(snapshot  => 
            (
                setRooms(snapshot.docs.map(doc =>
                    ({
                        id: doc.id,
                        data: doc.data()
                    })
                    ))
            ))
    },[])
    return (
        <div className="sideBar">
        <div className="sideBar__header">
            <Avatar src={user?.photoURL}/>
            <div className="sideBar__headerRight">
                <IconButton>
                <DonutLargeIcon/>
                </IconButton>
                <IconButton>
                <ChatIcon/>
                </IconButton>
            </div>
        </div>

        <div className="sideBar__search">
            <div className="sideBar__searchContainer">
            <SearchOutlinedIcon/>
            <input type="text" placeholder="search or start a new chat" />
            </div>
        </div>
        <div>
            <div className="sideBar__chat">
            <SidebarChat addNewChat/>
            {rooms.map(room =>
            <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                )}
            </div>
        </div>
        </div>
    )
}

export default Sidebar;
