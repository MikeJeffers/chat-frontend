//@ts-check
const send = (socket: WebSocket, command: string, ourId: string, data: object) => {
  socket.send(JSON.stringify({ command, ...data, socketId: ourId }));
};
export default send;