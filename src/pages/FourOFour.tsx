//@ts-check
import React from 'react';
import { Button, Center, Stack, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import Shell from '../components/Shell';

const FourOFour = () => {
  return (
    <Shell>
      <Center style={{ width: '100%', height: '50vh' }}>
        <Stack>
          <Title>404</Title>
          <Link to="/" style={{ textDecoration: 'none' }}><Button fullWidth>Go Back</Button></Link>
        </Stack>
      </Center>
    </Shell>
  )
}

export default FourOFour;