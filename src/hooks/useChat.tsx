//@ts-check
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from 'uuid';
import { Dispatch } from '../store'
import send from "./socketSender";
import { UserModel } from "../models/user";
import { onError } from "../notifications";
import { ServerName } from "../models/chat";

type PortMap = {
  [name in ServerName]: number;
};
const serverPortMap = {
  node:8077,
  python:8078
} as PortMap

const buildChat = (token: string, sockId: string, name: string, dispatch: Dispatch, chatServerName: ServerName) => {
  // eslint-disable-next-line no-restricted-globals
  const serverUrl = `ws://${location.hostname}:${serverPortMap[chatServerName]}`; //TODO make this lintable
  const ws = new WebSocket(serverUrl);
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
    send(ws, "AUTH", sockId, { token, name });
  };
  ws.onmessage = messageHandler(dispatch, chatServerName);
  return ws;
};

const messageHandler = (dispatch: Dispatch, server:ServerName) => (event: { data: string }) => {
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
      dispatch.chat.SET_MESSAGES({server, messages:data.messages});
      dispatch.chat.SET_USERS({server, users:data.users});
      break;
    }
    case 'CHANNEL_INFO': {
      dispatch.chat.SET_MESSAGES({server, messages:data.messages});
      dispatch.chat.SET_USERS({server, users:data.users});
      break;
    }
    case 'MESSAGE_ADD': {
      dispatch.chat.APPEND_MESSAGE({server, message:data.message});
      break;
    }
    case 'USER_LEAVE': {
      dispatch.chat.USER_LEAVE({server, user:data.user});
      break;
    }
    case 'USER_JOIN': {
      dispatch.chat.USER_JOIN({server, user:data.user});
      break;
    }
    case 'ERROR': {
      onError(data.message);
      console.log(data.message);
      break;
    }
    default: {
      console.log(command, "not recognized");
      break;
    }
  }
};

const useChat = (user: UserModel, chatServerName:ServerName) => {
  const dispatch = useDispatch<Dispatch>();
  const sockId = uuid();
  const socketRef = useRef<WebSocket>();

  useEffect(() => {
    const ws = buildChat(user.token, sockId, user.name, dispatch, chatServerName);
    socketRef.current = ws;
    return () => {
      socketRef.current?.close();
    };
  }, [dispatch, sockId, user.name]);


  const socketSend = (command: string, data: object) => {
    if (socketRef.current) {
      send(socketRef.current, command, sockId, data);
    }
  }

  const sendMessage = (message: string) => {
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