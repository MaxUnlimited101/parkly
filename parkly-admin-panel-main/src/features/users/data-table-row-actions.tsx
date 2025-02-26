import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Row } from '@tanstack/react-table'
import { IconTrash } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// import { useTasks } from '../context/tasks-context'
import { roles } from './data/data'
import { useDispatch } from 'react-redux'
import { setOpen, setCurrentRow } from '@/store/slices/usersSlice'
import { userSchema } from './data/schema'
import { toast } from '@/hooks/use-toast'
import { useUpdateUserMutation } from '@/services/api'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const user = userSchema.parse(row.original)
  const [updateUser] = useUpdateUserMutation()

  const handleRoleChange = async (newRole: string) => {
    try {
      await updateUser({ 
        id: user.id, 
        data: { ...user, role: newRole } 
      }).unwrap()
      
      toast({
        title: "Role updated",
        description: `User role has been updated to ${newRole}`,
      })
    } catch (error) {
      console.error("Could not update user role", error);
      toast({
        title: "Error",
        description: "Could not update user role",
        variant: "destructive",
      })
    }
  }

  const dispatch = useDispatch()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem
          onClick={() => {
            dispatch(setCurrentRow(user))
            dispatch(setOpen('update'))
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Roles</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup 
              value={user.role}
              onValueChange={handleRoleChange}
            >
              {roles.map((role) => (
                <DropdownMenuRadioItem key={role.value} value={role.value}>
                  {role.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            dispatch(setCurrentRow(user))
            dispatch(setOpen('delete'))
          }}
        >
          Delete
          <DropdownMenuShortcut>
            <IconTrash size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
