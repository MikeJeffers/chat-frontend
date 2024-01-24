//@ts-check
import { Models } from '@rematch/core';
import { chat } from './chat';
import { user } from './user';

export interface RootModel extends Models<RootModel> {
  chat: typeof chat
  user: typeof user
}

export const models: RootModel = { chat, user }