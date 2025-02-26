import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/table/data-table-view-options'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2 flex-wrap'>
        <Input
          placeholder='Filter by Reservation ID...'
          value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('id')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[200px]'
        />
        <Input
          placeholder='Filter by Parking Spot...'
          value={(table.getColumn('parkingSpotId')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('parkingSpotId')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[200px]'
        />
        <Input
          placeholder='Filter by User ID...'
          value={(table.getColumn('userId')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('userId')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[200px]'
        />
        <Input
          placeholder='Filter by Start Time...'
          value={(table.getColumn('startTime')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('startTime')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[200px]'
        />
        <Input
          placeholder='Filter by End Time...'
          value={(table.getColumn('endTime')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('endTime')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[200px]'
        />
        <Input
          placeholder='Filter by Total Cost...'
          value={(table.getColumn('totalCost')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('totalCost')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[200px]'
        />
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
