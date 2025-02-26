import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { TasksMutateDrawer } from './tasks-mutate-drawer'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/store'
import { setOpen, setCurrentRow } from '@/store/slices/tasksSlice'

export function TasksDialogs() {
  const dispatch = useDispatch()
  const { open, currentRow } = useSelector((state: RootState) => state.tasks)

  return (
    <>
      <TasksMutateDrawer
        key="task-create"
        open={open === 'create'}
        onOpenChange={() => { 
          dispatch(setCurrentRow(null))
          // dispatch(setOpen('create')) 
        } }
      />

      {currentRow && (
        <>
          <TasksMutateDrawer
            key={`task-update-${currentRow.id}`}
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
            key="task-delete"
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              dispatch(setOpen('delete'))
              setTimeout(() => {
                dispatch(setCurrentRow(null))
              }, 500)
            }}
            handleConfirm={() => {
              dispatch(setOpen(null))
              setTimeout(() => {
                dispatch(setCurrentRow(null))
              }, 500)
              toast({
                title: 'The following task has been deleted:',
                description: (
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                      {JSON.stringify(currentRow, null, 2)}
                    </code>
                  </pre>
                ),
              })
            }}
            className="max-w-md"
            title={`Delete this task: ${currentRow.id}?`}
            desc={
              <>
                You are about to delete a task with the ID{' '}
                <strong>{currentRow.id}</strong>.<br />
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
