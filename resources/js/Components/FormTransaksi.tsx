import { useState } from 'react';
import { router, useForm } from '@inertiajs/react';
import { Transaksi } from '@/types';
import { Input } from './shadcn/ui/input';
import { Button } from './shadcn/ui/button';
import toast from 'react-hot-toast';
import { Label } from './shadcn/ui/label';

export interface PostTransaksi {
    id_barang: number;
    quantity: number;
    tgl_transaksi: string;
    [key: string]: string | number;
}

interface Option {
    id: number;
    nama_barang: string;
    stok: number;
}

const FormTransaksi = ({ options, setIsDialogOpen }: { options: Option[], setIsDialogOpen: (value: boolean) => void }) => {
    const { data, setData, post, processing, errors } = useForm<PostTransaksi>({
        id_barang: 0,
        quantity: 0,
        tgl_transaksi: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (processing) {
                return toast.error('Error :', errors);
            }
            await post('/api/transaksi');
            toast.success('Transaksi berhasil disimpan');
            setIsDialogOpen(false); // Close the dialog
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <select
                name="id_barang"
                value={data.id_barang}
                onChange={handleChange}
                className='w-full rounded border py-2'
            >
                <option value="">Pilih Barang</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.nama_barang} - {option.stok}
                    </option>
                ))}
            </select>
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={data.quantity.toString()}
                    onChange={handleChange}
                />
                <Label htmlFor="tgl_transaksi">Tanggal Transaksi</Label>
            </div>
            <div className="grid w-full items-center gap-1.5">
                <Input
                    type="date"
                    name="tgl_transaksi"
                    value={data.tgl_transaksi}
                    onChange={handleChange}
                />
                <Button type="submit">Simpan</Button>
            </div>
        </form>
    );
};

export default FormTransaksi;
