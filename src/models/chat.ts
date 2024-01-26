import { createModel } from '@rematch/core'
import type { RootModel } from '.'

export interface MessageModel {
  id: string,
  message: string,
  from: string,
  at: string
}

export interface UserModel {
  id: string,
  name: string
}


type ChatState = {
  messages: MessageModel[],
  users: UserModel[]
}


type ChatServersState = {
  node: ChatState,
  python: ChatState,
  go: ChatState
}

export type ServerName = 'node' | 'python' | 'go';

const validServer = (state: ChatServersState, server: ServerName) => Object.keys(state).includes(server);

export const chat = createModel<RootModel>()({
  state: {
    node: {
      messages: [],
      users: []
    },
    python: {
      messages: [],
      users: []
    },
    go: {
      messages: [],
      users: []
    }
  } as ChatServersState,
  reducers: {
    SET_CHANNEL_INFO: (state: ChatServersState, payload: { server: ServerName, messages: MessageModel[], users: UserModel[] }) => {
      if (!validServer(state, payload.server)) {
        return state; // bad server string
      }
      return Object.assign({}, state, { [payload.server]: { messages: payload.messages, users: payload.users } });
    },
    SET_MESSAGES: (state: ChatServersState, payload: { server: ServerName, messages: MessageModel[] }) => {
      if (!validServer(state, payload.server)) {
        return state; // bad server string
      }
      return Object.assign({}, state, { [payload.server]: { messages: payload.messages, users: state[payload.server].users } });
    },
    SET_USERS: (state: ChatServersState, payload: { server: ServerName, users: UserModel[] }) => {
      if (!validServer(state, payload.server)) {
        return state; // bad server string
      }
      return Object.assign({}, state, { [payload.server]: { messages: state[payload.server].messages, users: payload.users } });
    },
    USER_JOIN: (state: ChatServersState, payload: { server: ServerName, user: UserModel }) => {
      if (!validServer(state, payload.server)) {
        return state; // bad server string
      } else if (state[payload.server].users.find((u) => u.id === payload.user.id)) {
        return state; // User already present in local state
      }
      return Object.assign({}, state, { [payload.server]: { messages: state[payload.server].messages, users: [...state[payload.server].users, payload.user] } });
    },
    USER_LEAVE: (state: ChatServersState, payload: { server: ServerName, user: UserModel }) => {
      if (!validServer(state, payload.server)) {
        return state; // bad server string
      }
      const filtered = state[payload.server].users.filter(u => u.id !== payload.user.id);
      if (filtered.length === state[payload.server].users.length) {
        return state; // User must not be in local state
      }
      return Object.assign({}, state, { [payload.server]: { messages: state[payload.server].messages, users: filtered } });
    },
    APPEND_MESSAGE: (state: ChatServersState, payload: { server: ServerName, message: MessageModel }) => {
      if (!validServer(state, payload.server)) {
        return state; // bad server string
      }
      return Object.assign({}, state, { [payload.server]: { users: state[payload.server].users, messages: [...state[payload.server].messages, payload.message] } });
    }
  }
});
