<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBarangRequest;
use App\Http\Resources\BarangResource;
use App\Models\Barang;
use Illuminate\Http\Request;

class BarangController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return BarangResource::collection(Barang::paginate());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBarangRequest $request)
    {
        Barang::create($request->validated());
        return response()->json('Barang berhasil dibuat!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Barang $barang)
    {
        return new BarangResource($barang);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Barang $barang)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreBarangRequest $request, Barang $barang)
    {
        $barang->update($request->validated());
        return response()->json('Barang berhasil di update!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Barang $barang)
    {
        $barang->delete();
        return response()->json('Barang berhasil di hapus!');
    }
}
