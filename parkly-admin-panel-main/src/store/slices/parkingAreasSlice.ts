import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ParkingArea } from '@/features/parking-areas/data/schema'

export type ParkingAreasDialogType = 'create' | 'update' | 'delete' | 'import'

interface ParkingAreasState {
  open: ParkingAreasDialogType | null
  currentRow: ParkingArea | null
}

const initialState: ParkingAreasState = {
  open: null,
  currentRow: null,
}

const ParkingAreasSlice = createSlice({
  name: 'ParkingAreas',
  initialState,
  reducers: {
    setOpen(state, action: PayloadAction<ParkingAreasDialogType | null>) {
      state.open = action.payload
    },
    setCurrentRow(state, action: PayloadAction<ParkingArea | null>) {
      state.currentRow = action.payload
    },
    // TODO: add reset functionality 
    resetParkingAreasState(state) {
      state.open = null
      state.currentRow = null
    },
  },
})

export const { setOpen, setCurrentRow, resetParkingAreasState } = ParkingAreasSlice.actions
export default ParkingAreasSlice.reducer
