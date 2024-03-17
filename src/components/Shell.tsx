//@ts-check
import React, { PropsWithChildren } from 'react';
import { AppShell, Burger, Grid, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

const App = (props: PropsWithChildren) => {
  const [opened, { toggle }] = useDisclosure(true);
  const navigate = useNavigate();
  return (
    <AppShell
      padding="md"
      offsetScrollbars={false}
      header={{ height: 64 }}
      navbar={{
        width: 240,
        breakpoint: 'xs',
        collapsed: { desktop: !opened, mobile: !opened }
      }}>
      <AppShell.Header p="xs" style={{ height: 64 }}>
        <Grid>
          <Grid.Col span={1}>
            <Burger opened={opened} onClick={toggle} />
          </Grid.Col>
          <Grid.Col span={9}>
          </Grid.Col>
        </Grid>
      </AppShell.Header>
      <AppShell.Navbar hidden={!opened} p="md">
        <NavLink onClick={() => { navigate('/register') }} active={window.location.pathname === '/register'} label={"Register"} description={"Register a new account"} />
        <NavLink onClick={() => { navigate('/login') }} active={window.location.pathname === '/login'} label={"Login"} description={"Login to chat"} /> 
        <NavLink onClick={() => { navigate('/chat') }} active={window.location.pathname === '/chat'} label={"Chat"} description={"Join the chat!"} />
      </AppShell.Navbar>
      <AppShell.Main>
        {props.children}
      </AppShell.Main>
    </AppShell>
  )
}

export default App;