<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    use HasFactory;

    protected $table = "barang";

    protected $fillable = [
        'id_jenis_barang',
        'nama_barang',
        'stok'
    ];

    public function jenisBarang()
    {
        return $this->belongsTo(JenisBarang::class, 'id_jenis_barang');
    }

    public function transaksi()
    {
        return $this->hasMany(Transaksi::class, 'id_barang');
    }
}
