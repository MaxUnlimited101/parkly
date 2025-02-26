import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { DataTableRowActions } from '@/features/reservations/data-table-row-actions'
import { Reservation } from '../reservations/data/schema'

export const columns: ColumnDef<Reservation>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Reservation ID' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'parkingSpotId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Parking Spot' />
    ),
    cell: ({ row }) => <span>{row.getValue('parkingSpotId')}</span>
  },
  {
    accessorKey: 'userId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='User ID' />
    ),
    cell: ({ row }) => <span>{row.getValue('userId')}</span>
  },
  {
    accessorKey: 'startTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Start Time' />
    ),
    cell: ({ row }) => <span>{row.getValue('startTime')}</span>
  },
  {
    accessorKey: 'endTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='End Time' />
    ),
    cell: ({ row }) => <span>{row.getValue('endTime')}</span>
  },
  {
    accessorKey: 'totalCost',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Total Cost' />
    ),
    cell: ({ row }) => (
      <Badge variant='outline'>{row.getValue('totalCost')}</Badge>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,  
  },
]