//@ts-check
import { Models } from '@rematch/core';
import { chat } from './chat'

export interface RootModel extends Models<RootModel> {
  chat: typeof chat
}

export const models: RootModel = { chat }