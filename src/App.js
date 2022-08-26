import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useStateValue } from './Stateprovider';
import { useState } from 'react';
function App() {
  const [{ user }] = useStateValue();
  const [open, setOpen] = useState(false);
  return (
    <div className="app">
      {!user ? (
        <Login image="https://www.freepnglogos.com/uploads/whatsapp-logo-png-hd-2.png" />
      ) : (
        <div className="app__body">
          <i
            onClick={!open ? () => setOpen(true) : () => setOpen(false)}
            className="fas fa-bars"
          ></i>
          <Router>
            {!open && <Sidebar setOpen={setOpen} />}
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
