import { DataTable } from '@/features/parking-spots/data-table'
import { columns } from '@/features/parking-spots/columns'
// import { parkingSpots  } from '@/features/parking-spots/data/parking-spots'
import { useGetAllParkingSpotsQuery } from '@/services/api'

export function ResevationsTable() {
  const { data, error, isLoading } = useGetAllParkingSpotsQuery({ page: 0 });
    
    if (isLoading) {
      return <div>Loading reservations...</div>;
    }
  
    if (error) {
      return <div className="text-red-500">Error fetching reservations.</div>;
    }
  
    const pakingSpotsServer = data?.content || [];

  return (
    <DataTable data={pakingSpotsServer} columns={columns} />
  )
}