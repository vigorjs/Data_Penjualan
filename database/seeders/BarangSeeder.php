<?php

namespace Database\Seeders;

use App\Models\Barang;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Barang::create([
            'id_jenis_barang' => 1,
            'nama_barang' => 'Kopi',
            'stok' => 100
        ]);
        Barang::create([
            'id_jenis_barang' => 1,
            'nama_barang' => 'Teh',
            'stok' => 100
        ]);
        Barang::create([
            'id_jenis_barang' => 2,
            'nama_barang' => 'Pasta Gigi',
            'stok' => 100
        ]);
        Barang::create([
            'id_jenis_barang' => 2,
            'nama_barang' => 'Sabun Mandi',
            'stok' => 100
        ]);
        Barang::create([
            'id_jenis_barang' => 2,
            'nama_barang' => 'Sampo',
            'stok' => 100
        ]);
    }
}
