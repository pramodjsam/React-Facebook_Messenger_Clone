import React,{useState,useEffect} from 'react';
import {Input,FormControl,IconButton } from '@material-ui/core';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import './App.css';
import Message from "./Message";
import db from "./firebase";

const App = function() {
  const [input,setInput] = useState("");
  const [messages,setMessages] = useState([]);
  const [username,setUsername] = useState("");

  useEffect(()=>{
    db.collection('messages')
      .orderBy("timestamp","desc")
      .onSnapshot(snapshot=>{
      setMessages(snapshot.docs.map(doc=>({id:doc.id,message:doc.data()})))
    })
  },[])

  useEffect(()=>{
    setUsername(prompt("Enter your username"));
  },[])

  const sendMessage=(e)=>{
    db.collection("messages").add({
      message:input,
      username:username,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    e.preventDefault();
    setMessages([...messages,{username:username,message:input}]);
    setInput("");
  }
  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100" alt="facebook-messenger-logo" />
      <h1>Facebook Messenger</h1>
      <h2>Welcome {username}</h2>
      <form className='app__form'>
        <FormControl className='app__formControl'>
           <Input className='app__input' placeHolder='Send Message' type='text' value={input} onChange={e=>setInput(e.target.value)} />
           <IconButton className='app__iconButton' disabled={!input} type='submit' onClick={sendMessage} >
             <SendIcon/>
           </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map(({id,message})=>(
          <Message key={id} username={username} message={message} />
        ))} 
      </FlipMove>
    </div>
  );
}

export default App;
