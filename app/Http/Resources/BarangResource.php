<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BarangResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "id_jenis_barang" => $this->id_jenis_barang,
            "nama_barang" => $this->nama_barang,
            "stok" => $this->stok,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at,
        ];
    }
}
