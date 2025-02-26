import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { DataTableColumnHeader } from '@/components/table/data-table-column-header'
import { DataTableRowActions } from '@/features/parking-spots/data-table-row-actions'
import { ParkingSpot } from './data/schema'

export const columns: ColumnDef<ParkingSpot>[] = [
  {
    accessorKey: 'Id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Spot ID' />
    ),
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('Id')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'spotNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Spot Number' />
    ),
    cell: ({ row }) => <span>{row.getValue('spotNumber')}</span>,
  },
  {
    accessorKey: 'parkingAreaId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Parking Area' />
    ),
    cell: ({ row }) => <span>{row.getValue('parkingAreaId')}</span>,
  },
  {
    accessorKey: 'isAvailable',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => (
      <Badge variant={row.getValue('isAvailable') ? 'default' : 'destructive'}>
        {row.getValue('isAvailable') ? 'Available' : 'Occupied'}
      </Badge>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]