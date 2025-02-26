import { Main } from '@/components/layout/main'
import { UsersDialogs } from '@/features/users/users-dialogs'
import { PrimaryButtons } from '@/components/primary-buttons'
import { UsersTable } from '@/features/users/users-table'
import { setOpen } from '@/store/slices/usersSlice'

export default function Page() {
  return (
    <div className="">
      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between gap-x-4 space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Users</h2>
            <p className='text-muted-foreground'>
              {/* Here&apos;s a list of your tasks for this month! */}
            </p>
          </div>
          <PrimaryButtons setOpen={setOpen} />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            <UsersTable />
        </div>
      </Main>
      <UsersDialogs />
    </div>
  )
}
