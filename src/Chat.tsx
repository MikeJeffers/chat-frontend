//@ts-check
import React from 'react';
import { AppShell, Burger, Button, Grid, Stack, Table } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import useChat from './hooks/useChat';

const chatRow = (message: string, from: string, at: Date) => {
  return (<Table.Tr>
    <Table.Td>{from}</Table.Td>
    <Table.Td>{message}</Table.Td>
    <Table.Td>{at.toISOString()}</Table.Td>
  </Table.Tr>)
}

const Chat = () => {
  const chatState = useSelector((state:RootState) => state.chat);
  const rows = chatState.messages.map(d => chatRow(d.message, d.from, d.at));
  return (
    <Grid justify="center" gutter={6} columns={12}>
      <Grid.Col>
        <Table>
          {rows}
        </Table>
      </Grid.Col>
    </Grid>
  )
};

export default Chat;