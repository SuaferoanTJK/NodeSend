import React, { useContext, useState, useEffect } from "react";

import Layout from "../../components/Layout";
import axiosClient from "../../config/axios";
import appContext from "../../context/app/appContext";
import authContext from "../../context/auth/authContext";
import Alert from "../../components/Alert";

export async function getServerSideProps({ params }) {
  const { link } = params;
  const answer = await axiosClient.get(`/api/links/${link}`);
  return {
    props: {
      link: answer.data,
    },
  };
}

export async function getServerSidePaths() {
  const links = await axiosClient.get("/api/links");
  return {
    paths: links.data.links.map((link) => ({
      params: { link: link.url },
    })),
    fallback: false,
  };
}

export default ({ link }) => {
  const AuthContext = useContext(authContext);
  const { userAuthenticated } = AuthContext;

  const AppContext = useContext(appContext);
  const { showAlert, msg } = AppContext;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      userAuthenticated();
    }
  }, []);

  const [hasPassword, setHasPassword] = useState(link.password);
  const [password, setPassword] = useState("");

  const verifyPassword = async (e) => {
    e.preventDefault();
    const data = {
      password,
    };
    try {
      const answer = await axiosClient.post(`/api/links/${link.link}`, data);
      setHasPassword(answer.data.password);
    } catch (error) {
      showAlert(error.response.data.msg);
    }
  };

  return (
    <Layout>
      {hasPassword ? (
        <>
          <div className="flex flex-col items-center mt-5">
            <p className="text-xl text-gray-700 mb-5">
              Este enlace está protegido por una contraseña, colocarlo a
              continuación
            </p>
            {msg && <Alert />}
            <div className="w-full max-w-lg">
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => {
                  verifyPassword(e);
                }}
              >
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-black text-sm font-bold mb-2"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Ingresar contraseña"
                    value={password}
                    onChange={(p) => setPassword(p.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 cursor-pointer w-full p-2 mt-2 rounded-lg text-white font-bold uppercase"
                  value="Validar contraseña"
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Descargar archivo
          </h1>
          <div className="flex items-center justify-center mt-10">
            <a
              href={`${process.env.backendURL}/api/files/${link.file}`}
              className="bg-red-500 hover:bg-red-600 text-center px-10 py-3 rounded-lg uppercase font-bold text-white cursor-pointer"
            >
              Click Aquí
            </a>
          </div>
        </>
      )}
    </Layout>
  );
};
