import { createModel } from '@rematch/core'
import type { RootModel } from '.'


export interface UserModel {
  id: string,
  name: string,
  token: string
}


type UserState = UserModel;

export const user = createModel<RootModel>()({
  state: {
    id: '',
    name: '',
    token: ''
  } as UserState,
  reducers: {
    SET: (state: UserState, payload: { token: string, id: string, name: string }) => {
      return Object.assign({}, state, payload);
    }
  }
})