import { createModel } from '@rematch/core'
import type { RootModel } from '.'

export interface MessageModel {
  id: string,
  message: string,
  from: string,
  at: Date
}

export interface UserModel {
  id: string,
  name: string
}


type ChatState = {
  messages: MessageModel[],
  users: UserModel[]
}


export const chat = createModel<RootModel>()({
  state: {
    messages: [],
    users: []
  } as ChatState,
  selectors: (slice, createSelector) => ({
    messagesSelector() {
      return slice((cart) => cart.messages)
    },
    userSelector() {
      return slice((cart) => cart.users)
    },
  }),
  reducers: {
    SET_CHANNEL_INFO: (state: ChatState, payload: { messages: MessageModel[], users: UserModel[] }) => {
      return Object.assign(state, payload);
    },
    SET_MESSAGES: (state: ChatState, messages: MessageModel[]) => {
      return Object.assign(state, { messages });
    },
    SET_USERS: (state: ChatState, users: UserModel[]) => {
      return Object.assign(state, { users });
    },
    USER_JOIN: (state: ChatState, user: UserModel) => {
      if (state.users.find((u) => u.id === user.id)) {
        return state; // User already present in local state
      }
      return Object.assign(state, { users: [...state.users, user] });
    },
    USER_LEAVE: (state: ChatState, user: UserModel) => {
      const filtered = state.users.filter(u => u.id !== user.id);
      if (filtered.length === state.users.length) {
        return state; // User must not be in local state
      }
      return Object.assign(state, { users: filtered });
    },
    APPEND_MESSAGE: (state: ChatState, message: MessageModel) => {
      return Object.assign(state, { users: [...state.messages, message] });
    }
  }
})