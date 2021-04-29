import react , {useState,useEffect} from 'react';
import './Home.css';
import Chat_List from './Chat_List';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Avatar,IconButton} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ContactsIcon from '@material-ui/icons/Contacts';
import db,{ provider } from './firebase';
import firebase from 'firebase';
import Popup from './join_popup';
import Top_Header from './Top_Header';
import { useStateValue } from './StateProvider';
import {BrowserRouter, Route, Switch} from "react-router-dom";


function Home(){

    const [isOpen, setIsOpen] = useState(false);
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
 
   const togglePopup = () => {
     setIsOpen(!isOpen);
   }

    const createChat = () => {
        const roomName = prompt("Plese enter Chat name");

        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            }); 
        }

        alert(roomName + " room created!");
    };

    
    return(
        <div>
            
            <div className="home">
              <h1 id="h1">Welcome to Roomer</h1>
                
                <div className="btns">
                <button className="btn" onClick = {createChat}>Create Room <AddCircleIcon  fontSize="large" style={{float:"right"}} /></button>
                <button className="btn" onClick={togglePopup} >Join Room <ExitToAppIcon fontSize="large" style={{float:"right"}}/></button>
                </div>
            </div>

            {isOpen && <Popup
      content={<>
        {rooms.map(room => (
                    <Chat_List key={room.id} id={room.id} name={room.data.name} />
                ))}
      </>}
      handleClose={togglePopup}
    />}
            
        </div>
    );
}



export default Home;