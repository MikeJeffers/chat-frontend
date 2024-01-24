//@ts-check
import React, { useEffect } from 'react';
import { Grid, Stack } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import useChat from '../hooks/useChat';
import MessageSender from '../components/MessageSender';
import ChatMessages from '../components/ChatMessages';
import { useNavigate } from 'react-router-dom';
import { ServerName } from '../models/chat';

interface ChatClientProps {
  serverName: ServerName
}

const ChatClient = (props:ChatClientProps) => {
  const navigate = useNavigate();
  const userState = useSelector((state: RootState) => state.user);
  const chat = useChat(userState, props.serverName);
  useEffect(() => {
    if (!userState.id || !userState.name || !userState.token) {
      navigate('/');
    }
  }, [userState]);
  return (
      <Grid justify="center" align="center" gutter={6} columns={12}>
        <Grid.Col span={10}>
          <Stack>
            <ChatMessages serverName={props.serverName}/>
            <MessageSender sendMessage={chat.commands.sendMessage}></MessageSender>
          </Stack>
        </Grid.Col>
      </Grid>
  )
};

export default ChatClient;