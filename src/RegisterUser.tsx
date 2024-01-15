//@ts-check
import React, { useEffect, useState } from 'react';
import { Button, Center, Group, SimpleGrid, TextInput } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';

const RegisterUser = () => {
  const dispatch = useDispatch();
  const configuredName = useSelector((state:RootState)=>state.user.name);
  const [name, setName] = useState<string>('');
  useEffect(()=>{}, [configuredName]);
  return (
    <Center>
      <SimpleGrid cols={1}>
        <TextInput label="Username" onChange={(e) => setName(e.target.value)} />
        <Group grow>
          <Button onClick={(e) => dispatch.user.SET_NAME(name)}>submit</Button>
        </Group>
      </SimpleGrid>
    </Center>
  )
};

export default RegisterUser;