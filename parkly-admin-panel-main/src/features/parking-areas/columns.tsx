import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'
import { ParkingArea } from './data/schema'

export const columns: ColumnDef<ParkingArea>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => <div className='max-w-[200px]'>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'address',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Address' />
    ),
    cell: ({ row }) => <div className='max-w-[200px]'>{row.getValue('address')}</div>,
  },
  {
    accessorKey: 'city',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='City' />
    ),
    cell: ({ row }) => <div>{row.getValue('city')}</div>,
  },
  {
    accessorKey: 'hourlyRate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Hourly Rate' />
    ),
    cell: ({ row }) => (
      <div className='font-medium'>
        ${Number(row.getValue('hourlyRate')).toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: 'longitude',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Longitude' />
    ),
    cell: ({ row }) => (
      <div>{Number(row.getValue('longitude')).toFixed(6)}</div>
    ),
  },
  {
    accessorKey: 'latitude',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Latitude' />
    ),
    cell: ({ row }) => (
      <div>{Number(row.getValue('latitude')).toFixed(6)}</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]