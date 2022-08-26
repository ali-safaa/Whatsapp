import React, { useState, useEffect } from 'react';
import './Chat.css';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './Stateprovider';
import firebase from 'firebase';

function Chat() {
  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');
  const [roomName, setRoomName] = useState('');
  const { roomId } = useParams();
  const [texts, setTexts] = useState([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) =>
          setTexts(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const send = (e) => {
    e.preventDefault();
    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput('');
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <img
          className="avatar"
          src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}
          alt=""
        />
        <div className="chatHeader__info">
          <h4>{roomName}</h4>
          <p>
            last seen at{' '}
            {new Date(
              texts[texts.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chatHeader__right">
          <i className="fas fa-search"></i>
        </div>
      </div>
      <div className="chat__body">
        {texts &&
          texts.map((text) => {
            const { name, message, timestamp } = text;
            return (
              <p
                className={`chat__message ${
                  name === user.displayName && `chat__receiver`
                }`}
              >
                <span className="chat__name">{name}</span>
                {message}
                <span className="chat__timeStamp">
                  {new Date(timestamp?.toDate()).toUTCString()}
                </span>
              </p>
            );
          })}
      </div>
      <div className="chat__footer">
        <i className="fas fa-face-smile"></i>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="type message"
          />
          <button onClick={send} type="submit">
            send
          </button>
        </form>
        <i className="fas fa-microphone"></i>
      </div>
    </div>
  );
}

export default Chat;
