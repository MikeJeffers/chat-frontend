//@ts-check
import React from 'react';
import { Tabs } from '@mantine/core';
import Shell from '../components/Shell';
import ChatClient from './ChatClient';

const ChatTabs = () => {
  return (
    <Shell>
      <Tabs keepMounted={false}>
        <Tabs.List>
          <Tabs.Tab value="node">Node Server</Tabs.Tab>
          <Tabs.Tab value="python">Python Server</Tabs.Tab>
          <Tabs.Tab value="go">Go Server</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="node">
          <ChatClient serverName={"node"} />
        </Tabs.Panel>
        <Tabs.Panel value="python">
          <ChatClient serverName={"python"} />
        </Tabs.Panel>
        <Tabs.Panel value="go">
          <ChatClient serverName={"go"} />
        </Tabs.Panel>
      </Tabs>
    </Shell>
  )
};

export default ChatTabs;