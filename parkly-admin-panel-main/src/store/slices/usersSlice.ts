import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@/features/users/data/schema'

export type UsersDialogType = 'create' | 'update' | 'delete' | 'import'

interface UsersState {
  open: UsersDialogType | null
  currentRow: User | null
}

const initialState: UsersState = {
  open: null,
  currentRow: null,
}

const UsersSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    setOpen(state, action: PayloadAction<UsersDialogType | null>) {
      state.open = action.payload
    },
    setCurrentRow(state, action: PayloadAction<User | null>) {
      state.currentRow = action.payload
    },
    // TODO: add reset functionality 
    resetUsersState(state) {
      state.open = null
      state.currentRow = null
    },
  },
})

export const { setOpen, setCurrentRow, resetUsersState } = UsersSlice.actions
export default UsersSlice.reducer
