import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useDispatch } from 'react-redux'

interface Props {
  setOpen: any
}

export function PrimaryButtons({ setOpen }: Props) {
  const dispatch = useDispatch()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => dispatch(setOpen('create'))}>
        <span>Create</span> <IconPlus size={18} />
      </Button>
    </div>
  )
}
