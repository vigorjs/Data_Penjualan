import { useEffect, useState } from 'react';
import CardSectionTitle from '@/Components/CardSectionTitle';
import { Card, CardContent } from '@/Components/shadcn/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Transaksi } from '@/types';
import { DataTable } from './Data-Table/Data-Table';
import { columns } from './Data-Table/Columns';
import { Toaster } from 'react-hot-toast';
import { Button, buttonVariants } from '@/Components/shadcn/ui/button';
import { BadgePlusIcon } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/Components/shadcn/ui/dialog"
import FormTransaksi from '@/Components/FormTransaksi';
import useDialogStore from '@/States/useDialogState';

function Index() {

  const { isDialogOpen, setIsDialogOpen } = useDialogStore();

  const [transaksi, setTransaksi] = useState<Transaksi[]>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/transaksi');
        if (!response.ok) {
          throw new Error('Terjadi kesalahan saat fetch data error');
        }
        const data = await response.json();
        await new Promise(resolve => setTimeout(resolve, 2500));
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
            <Button
                variant={'secondary'}
                className='bg-secondary/50 hover:bg-secondary/60 border m-6'
                onClick={() => setIsDialogOpen(true)}
            >
                <BadgePlusIcon className='mr-2 h-4 w-4' />
                Tambah Transaksi
            </Button>
        </div>
        <CardContent>
            <DataTable columns={columns} data={transaksi}/>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
              <DialogHeader>
                  <DialogTitle>Tambah Transaksi</DialogTitle>
                  <FormTransaksi />
              </DialogHeader>
          </DialogContent>
      </Dialog>
    </>
  );
}

Index.layout = (page: any) => <AuthenticatedLayout title='Data Penjualan' children={page}/>;

export default Index;
