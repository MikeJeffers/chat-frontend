//@ts-check
import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { models, RootModel } from './models/index';

export const store = init<RootModel>({
  models
})

export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>