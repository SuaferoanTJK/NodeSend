import React, { useContext, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import Dropzone from "../components/Dropzone";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import Alert from "../components/Alert";

const Index = () => {
  const AuthContext = useContext(authContext);
  const { userAuthenticated } = AuthContext;

  const AppContext = useContext(appContext);
  const { msg, url } = AppContext;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      userAuthenticated();
    }
  }, []);

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {url ? (
          <div className="flex flex-col items-center bg-white rounded-lg py-10">
            <p className="text-center">
              <span className="font-bold text-red-700 text-2xl uppercase">
                La URL es:
              </span>{" "}
              {`${process.env.frontendURL}/links/${url}`}
            </p>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 cursor-pointer w-3/5 p-2 rounded-lg text-white font-bold uppercase mt-5"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${process.env.frontendURL}/links/${url}`
                );
              }}
            >
              Copiar enlace
            </button>
          </div>
        ) : (
          <>
            {msg && <Alert />}
            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone />
              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:my-0">
                <h2 className="text-4xl font-sans font-bold text-gray-800 mb-4">
                  Compartir archivos de forma sencilla y privada
                </h2>
                <p className="text-lg leading-loose mb-2">
                  <span className="text-red-500 font-bold">React NodeSend</span>{" "}
                  permite compartir archivos con cifrado de extremo a extremo,
                  además de eliminar un archivo después de ser descargado. Así
                  que puede mantener lo que comparte en privado y asegurarse de
                  que sus cosas no permanezcan en línea para siempre.
                </p>
                <Link href="/createAccount">
                  <a className="text-red-500 font-bold text-lg hover:text-red-700">
                    Crear cuenta para mayores beneficios
                  </a>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
