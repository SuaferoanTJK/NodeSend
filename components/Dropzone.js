import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axiosClient from "../config/axios";

const Dropzone = () => {
  const onDrop = useCallback(async (acceptedFiles) => {
    console.log(acceptedFiles);
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    const answer = await axiosClient.post("/api/archivos", formData);
    console.log(answer.data);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  const files = acceptedFiles.map((file) => (
    <li
      key={file.lastModified}
      className="bg-white w-3/4 mx-auto p-3 mb-4 shadow-lg rounded"
    >
      <p className="font-bold text-xl">{file.path}</p>
      <p className="text-sm text-gray-500">
        {(file.size / Math.pow(1024, 2)).toFixed(2)} MB
      </p>
    </li>
  ));

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 mr-5">
      <ul>{files}</ul>
      <div {...getRootProps({ className: "dropzone w-full py-32" })}>
        <input className="h-100" {...getInputProps()} />
        <div className="text-center">
          {isDragActive ? (
            <p className="text-2xl text-center text-gray-600">Soltarlo acá</p>
          ) : (
            <p className="text-2xl text-center text-gray-600">
              Seleccionar archivo y arrastrarlo acá
            </p>
          )}

          <button
            className="bg-blue-700 py-3 rounded-lg text-white my-10 hover:bg-blue-800 w-3/5"
            type="button"
          >
            Seleccionar archivos
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
