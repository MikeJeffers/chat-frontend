//@ts-check
import React from 'react';
import { Grid } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import useChat from '../hooks/useChat';
import MessageSender from '../components/MessageSender';
import ChatMessages from '../components/ChatMessages';
import Shell from '../components/Shell';

const Chat = () => {
  const userState = useSelector((state: RootState) => state.user);
  const chat = useChat(userState);
  return (
    <Shell>
      <Grid justify="center" gutter={6} columns={12}>
        <Grid.Col>
          <ChatMessages />
          <MessageSender sendMessage={chat.commands.sendMessage}></MessageSender>
        </Grid.Col>
      </Grid>
    </Shell>
  )
};

export default Chat;