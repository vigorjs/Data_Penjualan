import { ColumnDef } from '@tanstack/react-table';
import { Transaksi } from '@/types';
import { CellAction } from './Cell-Action';


export const columns: ColumnDef<Transaksi>[] = [
  {
    accessorKey: "nama_barang",
    header: "nama_barang",
  },
  {
    accessorKey: "stok",
    header: "stok",
  },
  {
    accessorKey: "jumlah_terjual",
    header: "jumlah_terjual",
  },
  {
    accessorKey: "tgl_transaksi",
    header: "tgl_transaksi",
  },
  {
    accessorKey: "jenis_barang",
    header: "jenis_barang",
  },
  {
    accessorKey: '',
    id: 'actions',
    cell: ({ row }) => <CellAction data={{ ...row.original, id: row.original.id }} />,
  },
]
