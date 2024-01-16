//@ts-check
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextInput, PasswordInput, Center, Group, SimpleGrid, LoadingOverlay } from '@mantine/core';
import { useNavigate } from "react-router-dom";
import Shell from '../components/Shell';
import { useDispatch } from 'react-redux';
import { apiError } from '../notifications';

const headers = { 'Content-Type': 'application/json' };

const loginUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`http://localhost:3000/login`, { username, password }, { headers });
    return response.data;
  } catch (err:any) {
    apiError(err);
  }
  return null;
}

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      if (data && data.token && data.user) {
        dispatch.user.SET({ token: data.token, name: data.user.username, id: data.user.id });
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
          <h1>Login</h1>
          <TextInput label="Username" onChange={(e) => setUsername(e.target.value)} />
          <PasswordInput label="Password" onChange={(e) => setPassword(e.target.value)} />
          <Group grow>
            <Button onClick={handleLogin}>Login</Button>
          </Group>
        </SimpleGrid>
      </Center>
    </Shell>
  )
}

export default Login;