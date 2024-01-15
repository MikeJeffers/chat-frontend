//@ts-check
const send = (socket: WebSocket, command: string, ourId: string, data: Object) => {
  socket.send(JSON.stringify({ command, ...data, socketId: ourId }));
};
export default send;