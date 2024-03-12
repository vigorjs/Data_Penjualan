import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Input } from './shadcn/ui/input';
import { Button } from './shadcn/ui/button';
import toast from 'react-hot-toast';
import { Label } from './shadcn/ui/label';
import useDialogStore from '@/States/useDialogState';

export interface PostTransaksi {
    id_barang: number;
    quantity: number;
    tgl_transaksi: string;
    [key: string]: string | number;
}

interface Barang {
    id: number;
    nama_barang: string;
    stok: number;
}


const FormTransaksi = () => {
    const {isDialogOpen, setIsDialogOpen} = useDialogStore();

    const [barang, setBarang] = useState<Barang[]>([]);
    useEffect(() => {
        async function fetchData() {
        try {
            const response = await fetch('/api/barang');
            if (!response.ok) {
                throw new Error('Terjadi kesalahan saat fetch data error');
              }
            const data = await response.json();
            await new Promise(resolve => setTimeout(resolve, 1000));
            setBarang(data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        }
        if (isDialogOpen){
            fetchData();
        }
    }, [isDialogOpen]);

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
            setIsDialogOpen(false);
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
                {barang.map((option) => (
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
