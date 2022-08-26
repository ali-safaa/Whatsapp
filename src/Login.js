import React from 'react';
import { auth, provider } from './firebase';
import './Login.css';
import { useStateValue } from './Stateprovider';
import { actionTypes } from './reducer';
function Login(props) {
  const [{ user }, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img width={150} src={props.image} alt="login" />
        <button onClick={signIn} type="submit" className="login__text">
          login to google
        </button>
      </div>
    </div>
  );
}

export default Login;
