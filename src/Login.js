import React from 'react';
import ReactDOM from 'react-dom';
import './Login.css';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import GitHubIcon from '@material-ui/icons/GitHub';
import { IconButton } from '@material-ui/core';
import Chat from './Chat';
import { auth ,provider} from './firebase';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login(){

    const [{}, dispatch] = useStateValue();
    const GsignIn = () => {
      auth.signInWithPopup(provider).then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
     }    

    return(
      <div className="login">
        <center>
        <div className="login_window">

          <h1 className="title">Roomer</h1>
          {/*
          <input className="cred" placeholder="Email"></input>
          <br />
          <input className="cred" placeholder="Password"></input>
          <br /> 
          */}

          <button onClick={GsignIn}>Sign In with Google</button>

          {/*
          <p><a>Forgot password?</a></p>
          <p>New here? <a>Create account!</a></p>
          <br /> 
          */}

         {/*
          <div className="icons">
            <IconButton>
              <FacebookIcon style={{color:"black"}} />
            </IconButton>
            <IconButton>
              <InstagramIcon style={{color:"black"}} />
            </IconButton>
            <IconButton>
              <WhatsAppIcon style={{color:"black"}} />
            </IconButton>
            <IconButton>
              <GitHubIcon style={{color:"black"}} />
            </IconButton>
          </div> 
          */}

        </div>
        </center>

      </div>
    );

  }

export default Login;
