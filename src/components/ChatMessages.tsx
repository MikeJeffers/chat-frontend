//@ts-check
import React, { useEffect } from 'react';
import { Table } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


const chatRow = (message: string, from: string, at: string) => {
  return (<Table.Tr>
    <Table.Td>{from}</Table.Td>
    <Table.Td>{message}</Table.Td>
    <Table.Td>{at}</Table.Td>
  </Table.Tr>)
}

const ChatMessages = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const rows = messages.map(m => chatRow(m.message, m.from, m.at));
  return (
    <Table>
      {rows}
    </Table>
  )
};

export default ChatMessages;