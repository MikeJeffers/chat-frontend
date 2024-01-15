//@ts-check
import React from 'react';
import { Grid } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import useChat from './hooks/useChat';
import MessageSender from './MessageSender';
import ChatMessages from './ChatMessages';

const Chat = () => {
  const userState = useSelector((state: RootState) => state.user);
  const chat = useChat(userState);
  return (
    <Grid justify="center" gutter={6} columns={12}>
      <Grid.Col>
        <ChatMessages/>
        <MessageSender sendMessage={chat.commands.sendMessage}></MessageSender>
      </Grid.Col>
    </Grid>
  )
};

export default Chat;