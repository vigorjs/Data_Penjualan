import { Edit2Icon, MoreHorizontal, Trash2Icon } from 'lucide-react'
import { Button } from '@/Components/shadcn/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/Components/shadcn/ui/dropdown-menu'

import { Transaksi } from '@/types'
import toast from 'react-hot-toast'
import useDialogStore from '@/States/useDialogState'


interface CellActionProps {
  data: Transaksi
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {

  const { setIsDialogOpen } = useDialogStore();

  const onDelete = async () => {
    try {
      const response = await fetch(`/api/transaksi/${data.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success('Transaksi berhasil dihapus');
      } else {
        toast.error('Gagal menghapus transaksi');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className='cursor-pointer' onClick={() => setIsDialogOpen(true)}>
              <Edit2Icon className='mr-2 h-4 w-4' />
              Update
            </DropdownMenuItem>
            <DropdownMenuItem className='cursor-pointer' onClick={onDelete}>
              <Trash2Icon className='mr-2 h-4 w-4' />
              Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </>
  )
}
