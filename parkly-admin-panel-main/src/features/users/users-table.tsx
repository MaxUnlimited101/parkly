import { DataTable } from '@/features/users/data-table'
import { columns } from '@/features/users/columns'
import { useGetAllUsersQuery } from '@/services/api'
// import { users } from '@/features/users/data/users'

export function UsersTable() {
  // FIXME: Server-side pagination.
  const { data, error, isLoading } = useGetAllUsersQuery({ page: 0 });

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error fetching users.</div>;
  }

  const serverUsers = data?.content || [];
  // const serverUsersSortedById = serverUsers.sort((a, b) => a.id - b.id);
  // const totalCount = data?.totalCount || 0;

  console.log("users");
  console.log(serverUsers);
  return (
    <DataTable data={serverUsers} columns={columns} />
  )
}