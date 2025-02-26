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
          placeholder="Search by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("city") && (
          <DataTableFacetedFilter
            column={table.getColumn("city")}
            title="City"
            options={[
              { value: "Gdańsk", label: "Gdańsk" },
              { value: "Kraków", label: "Kraków" },
              { value: "Metropolis", label: "Metropolis" },
              { value: "Poznań", label: "Poznań" },
              { value: "Warsaw", label: "Warsaw" },
              { value: "Wrocław", label: "Wrocław" },
            ]}
          />
        )}
        {table.getColumn("hourlyRate") && (
          <DataTableFacetedFilter
            column={table.getColumn("hourlyRate")}
            title="Price Range"
            options={[
              { value: "0-3", label: "$0-$3" },
              { value: "3-5", label: "$3-$5" },
              { value: "5-7", label: "$5-$7" },
              { value: "7-10", label: "$7-$10" },
              { value: "10+", label: "$10+" },
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