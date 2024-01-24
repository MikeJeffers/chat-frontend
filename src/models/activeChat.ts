import { createModel } from '@rematch/core'
import type { RootModel } from '.'

export type ServerName = 'node' | 'python';


export const active = createModel<RootModel>()({
  state: 'node' as ServerName,
  reducers: {
    SET: (state: ServerName, payload: ServerName) => {
      return payload
    },
  }
});
