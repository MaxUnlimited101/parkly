import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/components/table/data-table-view-options'
import { DataTableFacetedFilter } from '@/components/table/data-table-faceted-filter'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search spot numbers..."
          value={(table.getColumn("spotNumber")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("spotNumber")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("parkingAreaId") && (
          <DataTableFacetedFilter
            column={table.getColumn("parkingAreaId")}
            title="Parking Area"
            options={[
              { value: "1", label: "Area A" },
              { value: "2", label: "Area B" },
              { value: "3", label: "Area C" },
              { value: "4", label: "Area D" },
              { value: "5", label: "Area E" },
              { value: "6", label: "Area F" },
              { value: "7", label: "Area G" },
              { value: "8", label: "Area H" },
              { value: "9", label: "Area I" },
              { value: "10", label: "Area J" },
              { value: "11", label: "Area K" },
              { value: "12", label: "Area L" },
              { value: "13", label: "Area M" },
              { value: "14", label: "Area N" },
              { value: "15", label: "Area O" },
              { value: "16", label: "Area P" },
              { value: "17", label: "Area Q" },
              { value: "18", label: "Area R" },
              { value: "19", label: "Area S" },
              { value: "20", label: "Area T" },
            ]}
          />
        )}
        {table.getColumn("isAvailable") && (
          <DataTableFacetedFilter
            column={table.getColumn("isAvailable")}
            title="Status"
            options={[
              { value: "true", label: "Available" },
              { value: "false", label: "Occupied" },
            ]}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}