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
import ChatMembers from '../components/ChatMembers';

interface ChatClientProps {
  serverName: ServerName
}

const ChatClient = (props: ChatClientProps) => {
  const navigate = useNavigate();
  const userState = useSelector((state: RootState) => state.user);
  const chat = useChat(userState, props.serverName);
  useEffect(() => {
    if (!userState.id || !userState.name || !userState.token) {
      navigate('/');
    }
  }, [userState]);
  return (
    <Grid justify="center" gutter={6} columns={12}>
      <Grid.Col span={8}>
        <Stack>
          <ChatMessages serverName={props.serverName} />
          <MessageSender sendMessage={chat.commands.sendMessage}></MessageSender>
        </Stack>
      </Grid.Col>
      <Grid.Col span={2}>
        <ChatMembers serverName={props.serverName} />
      </Grid.Col>
    </Grid>
  )
};

export default ChatClient;