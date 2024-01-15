//@ts-check
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextInput, PasswordInput, Center, Group, SimpleGrid, LoadingOverlay } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import Shell from '../components/Shell';
import { useDispatch } from 'react-redux';
import { RootState } from '../store';

const headers = { 'Content-Type': 'application/json' };

const registerUser = async (username:string, password:string) => {
  try {
    const response = await axios.post(`http://localhost:3000/register`, { username, password }, { headers });
    return response.data;
  } catch (err) {
    console.log(err);
  }
  return null;
}

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleRegister = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      const data = await registerUser(username, password);
      if (data && data.token && data.user) {
        dispatch.user.SET({token:data.token, name:data.user.username, id:data.user.id});
        navigate('/chat');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Shell>
      <Center>
        <SimpleGrid cols={1}>
          <LoadingOverlay visible={loading} />
          <h1>Register</h1>
            <TextInput label="Username" onChange={(e) => setUsername(e.target.value)} />
            <PasswordInput label="Password" onChange={(e) => setPassword(e.target.value)} />
          <Group grow>
            <Button onClick={handleRegister}>Register</Button>
          </Group>
        </SimpleGrid>
      </Center>
    </Shell>
  )
}

export default Register;