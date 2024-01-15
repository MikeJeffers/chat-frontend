//@ts-check
import React, { useEffect } from 'react';
import { AppShell, Burger, Stack, Grid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Chat from './Chat';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import RegisterUser from './RegisterUser';

const App = ( ) => {
  const [opened, { toggle }] = useDisclosure();
  const userState = useSelector((state:RootState) => state.user);
  return (
    <AppShell
      padding="md"
      offsetScrollbars={false}
      header={{ height: 64 }}
      navbar={{
        width: 120,
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
      <AppShell.Navbar hidden={!opened} p="xs">
        <Stack>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        {userState.name ? <Chat/> : <RegisterUser/>}
      </AppShell.Main>
    </AppShell>
  )
}

export default App;