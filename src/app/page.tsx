"use client";
import React from "react";
import { TemplateHandler } from "easy-template-x";

const Home = () => {
  const exportKTP = async (data: any) => {
    const handler = new TemplateHandler();
    const url = "/template/template_ktp.docx"; // URL file di dalam direktori public
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const doc = await handler.process(buffer, data);

    // save doc to file public
    const blob = new Blob([doc], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const urlFile = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = urlFile;
    a.download = data.NAMA + "_ktp.docx";
    // use the link to invoke a download
    document.body.appendChild(a);
    a.click();
    // remove the link
    setTimeout(() => {
      a.remove();
      window.URL.revokeObjectURL(urlFile);
    }, 0);
  };

  const submitForm = (e: any) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      NAMA: form.nama.value,
      NIK: form.nik.value,
      TMPTANGGALLAHIR: form.tmptanggallahir.value,
      JENISKELAMIN: form.jeniskelamin.value,
      ALAMAT: form.alamat.value,
      RTRW: form.rtrw.value,
      KELDESA: form.keldesa.value,
    };
    exportKTP(data);
  };

  return (
    <div className="container">
      <div className="flex items-center justify-center border-white border-2 h-screen">
        <div className="md:w-1/2 w-full p-5 border rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-4">Export KTP</h1>
          {/* create form for data */}
          <form onSubmit={submitForm}>
            <div className="mb-4">
              <label htmlFor="nik">NIK</label>
              <input
                type="text"
                id="nik"
                name="nik"
                placeholder="Masukkan NIK"
                className="block w-full p-2 ring-1 ring-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="nama">Nama</label>
              <input
                type="text"
                id="nama"
                name="nama"
                placeholder="Masukkan Nama"
                className="block w-full p-2 ring-1 ring-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tmptanggallahir">Tempat Tanggal Lahir</label>
              <input
                type="text"
                id="tmptanggallahir"
                name="tmptanggallahir"
                placeholder="Masukkan Tempat Tanggal Lahir"
                className="block w-full p-2 ring-1 ring-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <div className="text-xs mt-1 text-gray-400">
                Contoh : Sampang, 12 Oktober 2023
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="jeniskelamin">Jenis Kelamin</label>
              <input
                type="text"
                id="jeniskelamin"
                name="jeniskelamin"
                placeholder="Masukkan Jenis Kelamin"
                className="block w-full p-2 ring-1 ring-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="alamat">Alamat</label>
              <input
                type="text"
                id="alamat"
                name="alamat"
                placeholder="Masukkan Alamat"
                className="block w-full p-2 ring-1 ring-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="rtrw">RT/RW</label>
              <input
                type="text"
                id="rtrw"
                name="rtrw"
                placeholder="Masukkan RT/RW"
                className="block w-full p-2 ring-1 ring-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <div className="text-xs mt-1 text-gray-400">Contoh : 003/001</div>
            </div>
            <div className="mb-4">
              <label htmlFor="keldesa">Desa</label>
              <input
                type="text"
                id="keldesa"
                name="keldesa"
                placeholder="Masukkan Kelurahan/Desa"
                className="block w-full p-2 ring-1 ring-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>
            <button
              type="submit"
              className="p-2 mb-4 w-full bg-green-500 text-white font-medium rounded-md"
            >
              Download KTP
            </button>
            <button
              type="reset"
              className="p-2 w-full bg-red-500 text-white font-medium rounded-md"
            >
              Bersihkan Form
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
