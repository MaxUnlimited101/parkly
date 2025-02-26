import { DataTable } from '@/features/tasks/data-table'
import { columns } from '@/features/tasks/columns'
import { tasks } from '@/features/tasks/data/tasks'
import { Main } from '@/components/layout/main'
import { TasksDialogs } from '@/features/tasks/tasks-dialogs'
import { PrimaryButtons } from '@/components/primary-buttons'
import { setOpen } from '@/store/slices/tasksSlice'

export default function Page() {
  return (
    <div className="">
      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Tasks</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <PrimaryButtons setOpen={setOpen} />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={tasks} columns={columns} />
        </div>
        <TasksDialogs />
      </Main>
    </div>
  )
}
