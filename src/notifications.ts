//@ts-check
import { showNotification } from '@mantine/notifications';
import { AxiosError } from 'axios';

export const apiError = (err: AxiosError | { message: string }) => {
  let message: string = err.message ?? '';
  if (err instanceof AxiosError) {
    if (typeof err.response?.data === 'object') {
      message = JSON.stringify(err.response?.data);
    } else if (typeof err.response?.data === 'string') {
      message = err.response?.data;
    }
  }
  onError(message);
}

export const onError = (message: string) => {
  showNotification({
    title: 'Error!',
    message,
    color: 'red',
    autoClose: 1200
  });
}

export const onSuccess = (message: string) => {
  showNotification({
    title: 'Info',
    message,
    color: 'green',
    autoClose: 750
  });
}
