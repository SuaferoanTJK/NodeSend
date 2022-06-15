import React, { useContext, useEffect } from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import Dropzone from "../components/Dropzone";
import authContext from "../context/auth/authContext";

const Index = () => {
  const AuthContext = useContext(authContext);
  const { userAuthenticated } = AuthContext;

  useEffect(() => {
    userAuthenticated();
  }, []);

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
          <Dropzone />
          <div className="md:flex-1 mb-3 mx-2 mt-16 lg:my-0">
            <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
              Compartir archivos de forma sencilla y privada
            </h2>
            <p className="text-lg leading-loose mb-2">
              <span className="text-red-500 font-bold">React NodeSend</span>{" "}
              permite compartir archivos con cifrado de extremo a extremo,
              además de eliminar un archivo después de ser descargado. Así que
              puede mantener lo que comparte en privado y asegurarse de que sus
              cosas no permanezcan en línea para siempre.
            </p>
            <Link href="/createAccount">
              <a className="text-red-500 font-bold text-lg hover:text-red-700">
                Crear cuenta para mayores beneficios
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
