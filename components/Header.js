import React, { useContext } from "react";
import Link from "next/link";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const AuthContext = useContext(authContext);
  const { user, logout } = AuthContext;

  const AppContext = useContext(appContext);
  const { cleanState } = AppContext;

  const redirect = () => {
    router.push("/");
    cleanState();
  };

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <img
        className="w-64 mb-8 md:mb-0 cursor-pointer"
        src="/logo.svg"
        alt="logo"
        onClick={() => {
          redirect();
        }}
      />
      <div>
        {user ? (
          <div className="flex items-center">
            <p className="mr-2">Hola {user.name}</p>
            <button
              type="button"
              className="bg-black hover:bg-gray-800 px-5 py-3 rounded-lg text-white font-bold uppercase"
              onClick={() => {
                logout();
              }}
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <>
            <Link href="/login">
              <a className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">
                Iniciar Sesión
              </a>
            </Link>
            <Link href="/createAccount">
              <a className="bg-black hover:bg-gray-800 px-5 py-3 rounded-lg text-white font-bold uppercase">
                Crear Cuenta
              </a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
