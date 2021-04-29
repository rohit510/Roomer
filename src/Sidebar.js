import React from 'react';
import './Sidebar.css';
import  Chat_List from './Chat_List';
import {Avatar, IconButton} from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { grey } from '@material-ui/core/colors';

function Sidebar(){
    return(
        <div className="sidebar">
            <div className="header">
               <Avatar />
               
               <div className="iconsRight">
               <IconButton>
                   <ChatIcon />
               </IconButton>
               <IconButton>
                   <MoreVertIcon />
               </IconButton>
               </div>

            </div>

            <div className="search">
                <SearchIcon style={{fontSize: 25,margin: 2}}/>
                <input id="search_box" type="text" placeholder="Search for chats..."></input>

            </div>

            <div className="chats">
                <Chat_List />
                <Chat_List />
                <Chat_List />
                <Chat_List />

            </div>
        </div>
    );
}

export default Sidebar;
