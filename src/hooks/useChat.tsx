//@ts-check
import { useEffect, useRef } from "react";
import { useDispatch,  } from "react-redux";
import { v4 as uuid } from 'uuid';
import { Dispatch } from '../store'
import send from "./socketSender";


// eslint-disable-next-line no-restricted-globals
const SOCKET_SERVER_URL = `ws://${location.hostname}:8077`; //TODO make this lintable


const buildChat = (token:string, sockId:string, dispatch: Dispatch) => {
  const ws = new WebSocket(SOCKET_SERVER_URL);
  ws.onclose = (e) => {
    console.log(e)
    console.log('CONNECTION CLOSED');
  };
  ws.onerror = (e) => {
    console.log(e)
    console.log('CONNECTION ERRORED');
  };
  ws.onopen = (e) => {
    console.log(e);
    console.log('CONNECTION ESTABLISHED');
    console.log("Sending token:", token)
    send(ws, "AUTH", sockId, { token });
  };
  ws.onmessage = messageHandler(dispatch);
  return ws;
};

const messageHandler = (dispatch:Dispatch) => (event:{data:string}) => {
  let data;
  try {
    data = JSON.parse(event.data);
  } catch (err) {
    console.log('Message did not contain json data');
    return;
  }
  const command = data.command;
  console.log("RECV:", command, data)
  switch (command) {
    case 'ACK': {
      dispatch.chat.SET_MESSAGES(data.messages);
      dispatch.chat.SET_USERS(data.users);
      break;
    }
    case 'CHANNEL_INFO': {
      dispatch.chat.SET_MESSAGES(data.messages);
      dispatch.chat.SET_USERS(data.users);
      break;
    }
    case 'USER_LEAVE': {
      dispatch.chat.USER_LEAVE(data.user);
      break;
    }
    case 'USER_JOIN': {
      dispatch.chat.USER_JOIN(data.user);
      break;
    }
    case 'ERROR': {
      console.log(data.message);
      break;
    }
    default: {
      console.log(command, "not recognized");
      break;
    }
  }
};

const useChat = () => {
  const dispatch = useDispatch<Dispatch>();
  const sockId = uuid();
  const socketRef = useRef<WebSocket>();

  useEffect(() => {
    const ws = buildChat(sockId, sockId, dispatch);
    socketRef.current = ws;
    return () => {
      socketRef.current?.close();
    };
  }, [dispatch, sockId]);


  const socketSend = (command:string, data:Object) => {
    if(socketRef.current){
      send(socketRef.current, command, sockId, data);
    }
  }

  const sendMessage = (message:string) => {
    if (!message || !message.length) { return; }
    socketSend('SEND_MESSAGE', { message });
  };

  const refreshAll = () => {
    socketSend('REFRESH', {});
  };


  return {
    commands: {
      sendMessage, refreshAll
    },
  };
};

export default useChat;