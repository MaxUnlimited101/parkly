import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ParkingSpot } from '@/features/parking-spots/data/schema'

export type ParkingSpotsDialogType = 'create' | 'update' | 'delete' | 'import'

interface ParkingSpotsState {
  open: ParkingSpotsDialogType | null
  currentRow: ParkingSpot | null
}

const initialState: ParkingSpotsState = {
  open: null,
  currentRow: null,
}

const ParkingSpotsSlice = createSlice({
  name: 'ParkingSpots',
  initialState,
  reducers: {
    setOpen(state, action: PayloadAction<ParkingSpotsDialogType | null>) {
      state.open = action.payload
    },
    setCurrentRow(state, action: PayloadAction<ParkingSpot | null>) {
      state.currentRow = action.payload
    },
    // TODO: add reset functionality 
    resetParkingSpotsState(state) {
      state.open = null
      state.currentRow = null
    },
  },
})

export const { setOpen, setCurrentRow, resetParkingSpotsState } = ParkingSpotsSlice.actions
export default ParkingSpotsSlice.reducer
