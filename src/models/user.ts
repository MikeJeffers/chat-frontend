import { createModel } from '@rematch/core'
import type { RootModel } from '.'


export interface UserModel {
  id: string,
  name: string
}


type UserState = UserModel;

export const user = createModel<RootModel>()({
  state: {
    id: '',
    name: ''
  } as UserState,
  reducers: {
    SET_NAME: (state: UserState, name: string) => {
      return Object.assign({}, state, { name });
    },
    SET_ID: (state: UserState, id: string) => {
      return Object.assign({}, state, { id });
    }
  }
})