import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Transaksi } from '@/types';
import { Input } from './shadcn/ui/input';
import { Button } from './shadcn/ui/button';
import toast from 'react-hot-toast';

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

const FormTransaksi = ({ options }: { options: Option[] }) => {
    const [formData, setFormData] = useState<PostTransaksi>({
        id_barang: 0,
        quantity: 0,
        tgl_transaksi: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await router.post('/api/transaksi', formData); // Menggunakan objek JSON langsung
            toast.success('Data berhasil dibuat');
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <select
                name="id_barang"
                value={formData.id_barang}
                onChange={handleChange}
                className='w-full'
            >
                <option value="">Pilih ID Barang</option>
                {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.nama_barang} - {option.stok}
                </option>
                ))}
            </select>
            <Input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity.toString()}
                onChange={handleChange}
            />
            <Input
                type="date"
                name="tgl_transaksi"
                value={formData.tgl_transaksi}
                onChange={handleChange}
            />
            <Button type="submit">Simpan</Button>
        </form>
    );
};

export default FormTransaksi;
