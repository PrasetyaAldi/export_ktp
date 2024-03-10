import path from "path";
import { promisify } from "util";
import fs from "fs";
import Docxtemplater from "docxtemplater";
import React, { useState } from "react";

export default function Home() {
  const readFileAsync = promisify(fs.readFile);
  const writeFileAsync = promisify(fs.writeFile);

  const exportKTP = async () => {
    const data = {
      NAMA: "John Doe",
      NIK: "1234567890",
      TMPTANGGALLAHIR: "Jakarta, 01-01-1990",
      JENISKELAMIN: "LAKI-LAKI",
    };
    const tempPath = path.resolve("public/template", "template_ktp.docx");
    const content = await readFileAsync(tempPath, "binary");

    const doc = new Docxtemplater();
    doc.loadZip(content);

    doc.setData(data);

    doc.render();

    const buf = doc.getZip().generate({ type: "nodebuffer" });
    const output = path.resolve("public", "output.docx");
    await writeFileAsync(output, buf);

    console.log("Exported to", output);
  };

  return (
    <button className="p-2 text-white bg-red-600" onClick={() => exportKTP()}>
      Export
    </button>
  );
}
