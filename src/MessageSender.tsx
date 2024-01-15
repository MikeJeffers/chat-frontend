//@ts-check
import React, { useRef, useState } from 'react';
import { Button, Grid, TextInput } from '@mantine/core';

interface MessageSenderProps {
  sendMessage:(message:string)=>void
}

const MessageSender = (props:MessageSenderProps) => {
  const sendMessage = props.sendMessage;
  const ref = useRef<HTMLInputElement|null>(null);
  const [value, setValue] = useState<string>('');
  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value && value.length > 0) {
      sendMessage(value);
    }
    if (ref.current) {
      ref.current.value = '';
    }
    setValue('');
  }

  return (<form action='' onSubmit={onSubmit}>
    <Grid style={{ paddingTop: '0.5rem' }}>
      <Grid.Col span={9}>
        <TextInput ref={ref} value={value} onChange={(event) => setValue(event.currentTarget.value)} />
      </Grid.Col>
      <Grid.Col span={3}>
        <Button type="submit">Send</Button>
      </Grid.Col>
    </Grid>
  </form>)
}

export default MessageSender;