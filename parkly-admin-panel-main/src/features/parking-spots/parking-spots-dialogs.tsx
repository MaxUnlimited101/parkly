import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { ParkingSpotsMutateDrawer } from './parking-spots-mutate-drawer'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { setOpen, setCurrentRow } from '@/store/slices/parkingSpotsSlice'
import { useDeleteParkingSpotMutation } from '@/services/api'

export function ParkingSpotsDialogs() {
  const dispatch = useDispatch()
  const { open, currentRow } = useSelector((state: RootState) => state.parkingSpots)
  const [deleteParkingSpot] = useDeleteParkingSpotMutation()


    const handleConfirm = async () => {
      try {
        if (currentRow?.Id) {
          await deleteParkingSpot(currentRow.Id).unwrap()
          toast({
            title: 'Success. Reservation deleted successfully',
            description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">
                  {JSON.stringify(currentRow, null, 2)}
                </code>
              </pre>
            )
          })
          dispatch(setCurrentRow(null))
          dispatch(setOpen(null))
        }
      } catch (error) {
        console.error("Error", error)
        toast({
          title: "Error",
          description: "Failed to delete reservation",
          variant: "destructive",
        })
      }
    }
  

  return (
    <>
      <ParkingSpotsMutateDrawer
        key="parking-spots-create"
        open={open === 'create'}
        onOpenChange={() => { 
          dispatch(setOpen('create'))
        }}
      />

      {currentRow && (
        <>
          <ParkingSpotsMutateDrawer
            key={`parking-spots-update-${currentRow.Id}`}
            open={open === 'update'}
            onOpenChange={() => {
              dispatch(setOpen('update'))
              setTimeout(() => {
                dispatch(setCurrentRow(null))
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key="parking-spots-delete"
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              dispatch(setOpen('delete'))
              setTimeout(() => {
                dispatch(setCurrentRow(null))
              }, 500)
            }}
            handleConfirm={handleConfirm}
            className="max-w-md"
            title={`Delete this user: ${currentRow.Id}?`}
            desc={
              <>
                You are about to delete a user with the ID{' '}
                <strong>{currentRow.Id}</strong>.<br />
                This action cannot be undone.
              </>
            }
            confirmText="Delete"
          />
        </>
      )}
    </>
  )
}
