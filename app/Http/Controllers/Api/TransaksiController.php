<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTransaksiRequest;
use App\Http\Resources\TransaksiResource;
use App\Models\Barang;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Inertia\Ssr\Response;

class TransaksiController extends Controller
{
    public function index(){
        return TransaksiResource::collection(Transaksi::paginate());
    }

    public function store(StoreTransaksiRequest $request){
        $validatedData = $request->validated();
        $barang = Barang::findOrFail($validatedData['id_barang']);

        if($barang->stok < $validatedData['quantity']){
            return response()->json('Stok Kurang!');
        }
        Transaksi::create($validatedData);

        // Mengurangi stok barang yang terkait dengan transaksi
        $barang->stok -= $validatedData['quantity'];
        $barang->save();

        return to_route('dataPenjualan.index')->with('message', 'Data berhasil dibuat');
    }

    public function show(Transaksi $transaksi){
        return new TransaksiResource($transaksi);
    }

    public function update(StoreTransaksiRequest $request, Transaksi $transaksi){
        $validatedData = $request->validated();
        $barang = Barang::findOrFail($transaksi->id_barang);

        // Mengembalikan stok barang yang lama
        $oldQuantity = $transaksi->quantity;
        $newQuantity = $validatedData['quantity'];
        $barang->stok += $oldQuantity;

        if ($barang->stok < $newQuantity) {
            return response()->json('Stok Kurang!');
        }

        $transaksi->update($validatedData);
        $barang->stok -= $newQuantity;
        $barang->save();

        return to_route('dataPenjualan.index')->with('message', 'Data berhasil diupdate');
    }

    public function destroy(Transaksi $transaksi){

        // Menambah stok barang yang terkait dengan transaksi
        $barang = Barang::findOrFail($transaksi->id_barang);
        $barang->stok += $transaksi->quantity;
        $barang->save();

        $transaksi->delete();
        return response()->json('Data berhasil dihapus Kurang!');
    }
}
