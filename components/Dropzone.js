import React, { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import { SpinnerCircular } from "spinners-react";
import appContext from "../context/app/appContext";
import authContext from "../context/auth/authContext";
import Form from "./Form";

const Dropzone = () => {
  const AppContext = useContext(appContext);
  const { loading, showAlert, uploadFile, createLink } = AppContext;

  const AuthContext = useContext(authContext);
  const { authenticated } = AuthContext;

  const onDropRejected = () => {
    showAlert(
      "El archivo supera 1MB, para tener 10MB debe obtener una cuenta gratis"
    );
  };

  const onDropAccepted = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    uploadFile(formData, acceptedFiles[0].path);
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDropAccepted, onDropRejected, maxSize: 1000000 });

  const files = acceptedFiles.map((file) => (
    <li
      key={file.lastModified}
      className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
    >
      <p className="font-bold text-xl">{file.path}</p>
      <p className="text-sm text-gray-500">
        {(file.size / Math.pow(1024, 2)).toFixed(2)} MB
      </p>
    </li>
  ));

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 p-5 mr-5">
      {acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-4">Archivos</h4>
          <ul>{files}</ul>
          {authenticated && <Form />}
          {loading ? (
            <div className="flex justify-center">
              <SpinnerCircular
                color={"#4474E3"}
                secondaryColor={"#ABBBE0"}
                size={60}
              />
            </div>
          ) : (
            <button
              type="button"
              className="bg-blue-700 py-3 rounded-lg text-white my-10 hover:bg-blue-800 w-full"
              onClick={() => {
                createLink();
              }}
            >
              Crear enlace
            </button>
          )}
        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone w-full py-32" })}>
          <input className="h-100" {...getInputProps()} />
          {isDragActive ? (
            <p className="text-2xl text-center text-gray-600">Soltarlo acá</p>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-gray-600">
                Seleccionar archivo y arrastrarlo aquí
              </p>
              <button
                type="button"
                className="bg-blue-700 py-3 rounded-lg text-white my-10 hover:bg-blue-800 w-3/5"
              >
                Seleccionar archivos
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
