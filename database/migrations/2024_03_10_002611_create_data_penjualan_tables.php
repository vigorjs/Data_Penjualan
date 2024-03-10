<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('jenis_barang', function (Blueprint $table) {
            $table->id();
            $table->string('nama_jenis');
        });

        Schema::create('barang', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_jenis_barang');
            $table->string('nama_barang');
            $table->integer('stok');
            $table->timestamps();

            $table->foreign('id_jenis_barang')->references('id')->on('jenis_barang')->onDelete('cascade');
        });

        Schema::create('transaksi', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_barang');
            $table->integer('quantity');
            $table->dateTime('tgl_transaksi');
            $table->timestamps();

            $table->foreign('id_barang')->references('id')->on('barang')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('jenis_barang');
        Schema::dropIfExists('barang');
        Schema::dropIfExists('transaksi');
    }
};
