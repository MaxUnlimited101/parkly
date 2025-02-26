import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Task } from '@/features/tasks/data/schema'

export type TasksDialogType = 'create' | 'update' | 'delete' | 'import'

interface TasksState {
  open: TasksDialogType | null
  currentRow: Task | null
}

const initialState: TasksState = {
  open: null,
  currentRow: null,
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setOpen(state, action: PayloadAction<TasksDialogType | null>) {
      state.open = action.payload
    },
    setCurrentRow(state, action: PayloadAction<Task | null>) {
      state.currentRow = action.payload
    },
    // TODO: add reset functionality 
    resetTasksState(state) {
      state.open = null
      state.currentRow = null
    },
  },
})

export const { setOpen, setCurrentRow, resetTasksState } = tasksSlice.actions
export default tasksSlice.reducer
