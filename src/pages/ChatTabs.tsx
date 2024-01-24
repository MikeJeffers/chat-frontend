//@ts-check
import React from 'react';
import { useDispatch, useSelector} from "react-redux";
import { Tabs } from '@mantine/core';
import Shell from '../components/Shell';
import ChatClient from './ChatClient';
import { RootState } from '../store';

const ChatTabs = () => {
  // const dispatch = useDispatch();
  // const active = useSelector((state:RootState)=>state.active);
  return (
    <Shell>
      <Tabs>
      {/* <Tabs value={active} onChange={(value)=>dispatch.active.SET(value)}> */}
        <Tabs.List>
          <Tabs.Tab value="node">Node Server</Tabs.Tab>
          <Tabs.Tab value="python">Python Server</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="node">
          <ChatClient serverName={"node"} />
        </Tabs.Panel>
        <Tabs.Panel value="python">
          <ChatClient serverName={"python"} />
        </Tabs.Panel>
      </Tabs>
    </Shell>
  )
};

export default ChatTabs;