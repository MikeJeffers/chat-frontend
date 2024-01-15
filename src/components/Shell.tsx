//@ts-check
import React, {PropsWithChildren} from 'react';
import { AppShell, Burger, Stack, Grid, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';

interface ShellProps {}

const App = (props:PropsWithChildren<ShellProps>) => {
  const [opened, { toggle }] = useDisclosure();
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
          <Link to="/register" style={{ textDecoration: 'none' }}><Button fullWidth>Register</Button></Link>
          <Link to="/login" style={{ textDecoration: 'none' }}><Button fullWidth>Login</Button></Link>
          <Link to="/chat" style={{ textDecoration: 'none' }}><Button fullWidth>Play</Button></Link>
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main>
        {props.children}
      </AppShell.Main>
    </AppShell>
  )
}

export default App;