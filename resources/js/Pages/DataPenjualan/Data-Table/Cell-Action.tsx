import { BadgePlusIcon, Edit, Edit2Icon, Image, MoreHorizontal, Newspaper, SaveIcon, Trash2Icon, UploadCloudIcon } from 'lucide-react'
import { Button, buttonVariants } from '@/Components/shadcn/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/Components/shadcn/ui/dropdown-menu'

import { Transaksi } from '@/types'
import toast from 'react-hot-toast'

interface CellActionProps {
  data: Transaksi
  onEdit: () => void;
}

export const CellAction: React.FC<CellActionProps> = ({ data, onEdit }) => {
    const handleEdit = async () => {
        onEdit();
      };

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
            <DropdownMenuItem className='cursor-pointer' onClick={handleEdit}>
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
