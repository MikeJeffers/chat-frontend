//@ts-check
import { Models } from '@rematch/core';
import { chat } from './chat';
import { user } from './user';
import { active } from './activeChat';

export interface RootModel extends Models<RootModel> {
  chat: typeof chat
  user: typeof user
  active: typeof active
}

export const models: RootModel = { chat, user, active }