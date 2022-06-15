import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Layout from "../components/Layout";

const createAccount = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      email: Yup.string()
        .email("No es un correo válido")
        .required("El correo es obligatorio"),
      password: Yup.string()
        .min(6, "La contraseña debe tener mínimo 6 carácteres")
        .required("La contraseña es obligatoria"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
          Crear Cuenta
        </h2>
        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-black text-sm font-bold mb-2"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Ingresar nombre de usuario"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-700 pt-2">
                    <p>{formik.errors.name}</p>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-black text-sm font-bold mb-2"
                >
                  Correo
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Ingresar correo"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-red-700 pt-2">
                    <p>{formik.errors.email}</p>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-black text-sm font-bold mb-2"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Ingresar contraseña"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="text-red-700 pt-2">
                    <p>{formik.errors.password}</p>
                  </div>
                )}
              </div>
              <input
                type="submit"
                className="bg-red-500 hover:bg-red-600 cursor-pointer w-full p-2 mt-2 rounded-lg text-white font-bold uppercase"
                value="Crear cuenta"
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default createAccount;
