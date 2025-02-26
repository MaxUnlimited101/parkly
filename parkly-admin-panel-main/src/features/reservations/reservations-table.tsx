import { DataTable } from '@/features/reservations/data-table'
import { columns } from '@/features/reservations/columns'
// import { reservations  } from '@/features/reservations/data/reservations'
import { useGetAllReservationsQuery } from '@/services/api'

export function ResevationsTable() {
    const { data, error, isLoading } = useGetAllReservationsQuery({ page: 0 });
  
    if (isLoading) {
      return <div>Loading reservations...</div>;
    }
  
    if (error) {
      return <div className="text-red-500">Error fetching reservations.</div>;
    }
  
    const serverReservations = data?.content || [];
    // const serverReservationsSortedById = serverReservations.sort((a, b) => a.id - b.id);
    // const totalCount = data?.totalCount || 0;
  
    console.log("reservations");
    console.log(serverReservations);

  return (
    <DataTable data={serverReservations} columns={columns} />
  )
}