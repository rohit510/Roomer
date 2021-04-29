import React, {useRef, useEffect, useState} from 'react';
import './Chat.css';
import {Avatar,IconButton, useRadioGroup} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import ImageIcon from '@material-ui/icons/Image';
import MoreVertIcon from '@material-ui/icons/MoreVert';
//import avatar from './avatar.png';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import {useStateValue} from './StateProvider';

function Chat(){

     const [input,setInput] = useState(""); 
     const {roomId} = useParams(); 
     const [roomName, setRoomName] = useState("");
     const [messages,setMessages] = useState([]);
     const [{user},dispatch] = useStateValue();
     const messageEl = useRef(null);
     
     useEffect(() => {
        if (roomId){
            db.collection('rooms').doc(roomId).onSnapshot((snapshot) =>
            setRoomName(snapshot.data().name));

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot)=>
            setMessages(snapshot.docs.map((doc) => doc.data()))
            );
        }
     }, [roomId]);

     useEffect(() => {
        if (messageEl) {
          messageEl.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
          });
        }
      }, [])

    const send_msg = (e) => {
        e.preventDefault();
        console.log("you typed:",input);
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setInput("");
    }

    return (
        <div className="chat_area">

            <div className="chat_header">
            
                <div className="user_display">
                    
                    <h2 id="chat_name">{roomName}</h2>
                    <p style={{paddingLeft:"1px"}}>Active Now</p>
                </div>
                
                    

            </div>
            
            <div className="chat_box" ref={messageEl}>
                {messages.map(message => (
                    <p className={`chat_msg ${message.name == user.displayName && "chat_mine"}`}>
                    <span className="msg_chat_name">{message.name}</span>
                    {message.message}
                    <span className="chat_time">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}  
            </div>
            
            <form>
            <div className="text_box">
    
                <input id="text_area" type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message..."></input>
                <div className="iconsRight">
                    <IconButton type="submit" onClick={send_msg}>
                        <SendIcon/>
                    </IconButton>
               </div>

            </div>
            </form>
        </div>
    );
}

export default Chat;