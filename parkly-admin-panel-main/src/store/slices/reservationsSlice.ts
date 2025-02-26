import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Reservation } from '@/features/reservations/data/schema'

export type ReservationsDialogType = 'create' | 'update' | 'delete' | 'import'

interface ReservationsState {
  open: ReservationsDialogType | null
  currentRow: Reservation | null
}

const initialState: ReservationsState = {
  open: null,
  currentRow: null,
}

const ReservationsSlice = createSlice({
  name: 'Reservations',
  initialState,
  reducers: {
    setOpen(state, action: PayloadAction<ReservationsDialogType | null>) {
      state.open = action.payload
    },
    setCurrentRow(state, action: PayloadAction<Reservation | null>) {
      state.currentRow = action.payload
    },
    // TODO: add reset functionality 
    resetReservationsState(state) {
      state.open = null
      state.currentRow = null
    },
  },
})

export const { setOpen, setCurrentRow, resetReservationsState } = ReservationsSlice.actions
export default ReservationsSlice.reducer
