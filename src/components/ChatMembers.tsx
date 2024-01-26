//@ts-check
import React, { useRef } from 'react';
import { ScrollArea, Table } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ServerName } from '../models/chat';

interface ChatClientProps {
  serverName: ServerName
}

const chatRow = (name: string) => {
  return (<Table.Tr>
    <Table.Td>{name}</Table.Td>
  </Table.Tr>)
}

const ChatMembers = (props:ChatClientProps) => {
  const chatViewport = useRef<HTMLDivElement>(null);
  const users = useSelector((state: RootState) => state.chat[props.serverName].users);
  const rows = users.map((u) => chatRow(u.name));
  return (
    <ScrollArea h={'50vh'} scrollbarSize={20} scrollHideDelay={2000} viewportRef={chatViewport}>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  )
};

export default ChatMembers;