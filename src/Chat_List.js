import { Avatar, ButtonBase } from '@material-ui/core';
import React from 'react';
import './Chat_list.css';
import {Link} from 'react-router-dom';

function Chat_List({id,name,addNewChat}){
    return(
        <Link to={`/rooms/${id}`} className="links">
        <div className="header_chats">
                    <span style={{marginLeft:"0.3vw",textTransform:"capitalize"}}>{name}</span>
        </div>
        </Link>   
    );
}

export default Chat_List;