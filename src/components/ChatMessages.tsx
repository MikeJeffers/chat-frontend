//@ts-check
import React, { useEffect, useRef } from 'react';
import { ScrollArea, Table } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ServerName } from '../models/chat';

interface ChatClientProps {
  serverName: ServerName
}

const chatRow = (message: string, from: string, at: string) => {
  return (<Table.Tr>
    <Table.Td>{from}</Table.Td>
    <Table.Td>{message}</Table.Td>
    <Table.Td>{at}</Table.Td>
  </Table.Tr>)
}

const ChatMessages = (props:ChatClientProps) => {
  const chatViewport = useRef<HTMLDivElement>(null);
  const active = useSelector((state:RootState)=>state.active);
  const messages = useSelector((state: RootState) => state.chat[props.serverName].messages, {equalityFn:(a, b)=>{
    console.log(a, b)
    return a.length==b.length
}});
  const rows = messages.map((m) => chatRow(m.message, m.from, m.at));
  const scrollToBottom = () => {
    if (chatViewport && chatViewport.current) {
      chatViewport.current.scrollTo({ top: chatViewport.current.scrollHeight, behavior: 'smooth' });
    }
  };
  useEffect(() => scrollToBottom(), [messages, active]);
  return (
    <ScrollArea h={'50vh'} scrollbarSize={20} scrollHideDelay={2000} viewportRef={chatViewport}>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>From</Table.Th>
            <Table.Th>Message</Table.Th>
            <Table.Th>Timestamp</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  )
};

export default ChatMessages;