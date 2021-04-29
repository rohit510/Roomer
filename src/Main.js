import React,{useState} from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Top_Header from './Top_Header';
import './Main.css';
import Login from './Login.js';
import {Redirect, Route,BrowserRouter as Router , Switch } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import Home from './Home';

function Main(){
   
    const [{user},dispatch] = useStateValue();

        return(
            <div className="app">

              {!user ? (
                  <Login />
              ):(
                <div className="main">
                <Router>
                    <Switch>

                        <Route exact path="/">
                            <Home />
                        </Route>
    
                        <Route path="/rooms/:roomId">
                            <Top_Header />
                            <Chat />    
                        </Route>
                                                
                    </Switch>    
                </Router>
                </div>        
              )}                
            </div>
              
                
        );

    
}

export default Main;