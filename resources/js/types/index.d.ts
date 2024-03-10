import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface Transaksi {
    id: number;
    nama_barang: string;
    stok: number;
    id_barang: number;
    jumlah_terjual: number;
    tgl_transaksi: string;
    jenis_barang: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    role: string;
    ziggy: Config & { location: string };
};
