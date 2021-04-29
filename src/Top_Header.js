import React,{useEffect,useState} from 'react';
import './Top_Header.css';
import Chat_List from './Chat_List.js';
import {Avatar,IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
//import avatar from './avatar.png';
import db,{ provider } from './firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';
import Login from './Login';
import {Link} from 'react-router-dom';

function Top_Header()
{
    const [rooms,setRooms] = useState([]);
    const [{user},dispatch] = useStateValue();
    
     

    useEffect(() => {
        const unsubscibe = db.collection('rooms').onSnapshot((snapshot) => 
        setRooms(
            snapshot.docs.map((doc) => 
                ({
                  id:doc.id,
                  data:doc.data(),  
                }))
        )
    );
        return() => {
            unsubscibe();
        } 

    }, []);

    const createChat = () => {
        const roomName = prompt("Plese enter Chat name");

        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            }); 
        }
    };

    /*const sign_out = () => {
        firebase.auth().signOut().then(function() {
            dispatch({
                user: null,
            });
            
          }).catch(function(error) {
            // An error happened.
          });
    }*/

    const sign_out = () => {
        window.location.reload();
    }

    return (
            <div className="top_header">
               {/* <IconButton>
                    <AddCircleIcon fontSize="large" onClick = {createChat}/>
               </IconButton> */}

                <IconButton>
                    <NavigateBeforeIcon fontSize="large" style={{position:"fixed"}}/>
                </IconButton>

                <div className="chats">
                
                {rooms.map(room => (
                    <Chat_List key={room.id} id={room.id} name={room.data.name} />
                ))}
                
                </div>
                
                <IconButton>
                    <NavigateNextIcon fontSize="large" style={{position:"fixed"}}/>
                </IconButton>
                
                <div className="top_header_right">
                    {/*<div className="search">
                        <SearchIcon style={{color:"grey"}} />
                        <input id="search_box" type="text" placeholder="Search for chats..."></input>
                </div>*/}

                    <div>

                        <Link to="/">
                        <IconButton>
                            <HomeIcon fontSize="large"/>
                        </IconButton>
                        </Link>

                        <IconButton>
                            <Avatar src={user?.photoURL} />
                        </IconButton>

                        <IconButton>
                            <ExitToAppIcon onClick={sign_out} fontSize="large"/>
                        </IconButton>
                        
                    </div>
                    
                </div>          
            </div>

    );
}

export default Top_Header;
