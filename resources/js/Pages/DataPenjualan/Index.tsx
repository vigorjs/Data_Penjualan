import { useEffect, useState } from 'react';
import CardSectionTitle from '@/Components/CardSectionTitle';
import { Card, CardContent } from '@/Components/shadcn/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Transaksi } from '@/types';
import { DataTable } from './Data-Table/Data-Table';
import { columns } from './Data-Table/Columns';
import { Toaster } from 'react-hot-toast';
import { Button } from '@/Components/shadcn/ui/button';
import { BadgePlusIcon } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/Components/shadcn/ui/dialog"
import FormTransaksi from '@/Components/FormTransaksi';

function Index() {
  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/transaksi');
        const data = await response.json();
        setTransaksi(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [transaksi]);

  return (
    <>
      <Head title='Index' />
      <Toaster position="top-center" />
      <Card>
        <div className='flex justify-between items-center'>
            <CardSectionTitle
            title='Data Penjualan'
            />
            <Dialog>
                <DialogTrigger>
                    <Button
                        variant={'secondary'}
                        className='bg-secondary/50 hover:bg-secondary/60 border m-6'>
                        <BadgePlusIcon className='mr-2 h-4 w-4' />
                        Tambah Transaksi
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tambah Transaksi</DialogTitle>
                        <FormTransaksi options={}/>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
        <CardContent>
            <DataTable columns={columns} data={transaksi} />
        </CardContent>
      </Card>
    </>
  );
}

Index.layout = (page: any) => <AuthenticatedLayout title='Data Penjualan' children={page}/>;

export default Index;
