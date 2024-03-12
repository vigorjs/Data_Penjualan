import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './Cell-Action';
import { Transaksi } from '@/types';

export const columns: ColumnDef<Transaksi>[] = [
  {
    accessorKey: "nama_barang",
    header: "Nama Barang",
  },
  {
    accessorKey: "stok",
    header: "Stok",
  },
  {
    accessorKey: "jumlah_terjual",
    header: "Jumlah Terjual",
  },
  {
    accessorKey: "tgl_transaksi",
    header: "Tgl Transaksi",
  },
  {
    accessorKey: "jenis_barang",
    header: "Jenis Barang",
  },
  {
    accessorKey: '',
    id: 'actions',
    cell: ({ row }) => <CellAction data={{ ...row.original }} />,
  },
]
