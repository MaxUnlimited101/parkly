import { DataTable } from '@/features/parking-areas/data-table'
import { columns } from '@/features/parking-areas/columns'
// import { parkingAreas } from '@/features/parking-areas/data/parking-areas'
import { useGetAllParkingAreasQuery } from '@/services/api'

export function ResevationsTable() {
  const { data, error, isLoading } = useGetAllParkingAreasQuery({ page: 0 });
    
    if (isLoading) {
      return <div>Loading reservations...</div>;
    }
  
    if (error) {
      return <div className="text-red-500">Error fetching reservations.</div>;
    }
  
    const parkingAreasServer = data?.content || [];
    console.log("parkingAreas");
    console.log(parkingAreasServer);
  return (
    <DataTable data={parkingAreasServer} columns={columns} />
  )
}