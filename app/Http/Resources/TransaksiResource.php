<?php

namespace App\Http\Resources;

use App\Models\Barang;
use App\Models\JenisBarang;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransaksiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
         // Mengambil barang yang terkait dengan transaksi
        $barang = Barang::findOrFail($this->id_barang);

        return [
            'id' => $this->id,
            'nama_barang' => $barang->nama_barang,
            'stok' => $barang->stok,
            'id_barang' => $this->id_barang,
            'jumlah_terjual' => $this->quantity,
            'tgl_transaksi' => $this->tgl_transaksi,
            'jenis_barang' => $barang->jenisBarang->nama_jenis,
        ];
    }
}
