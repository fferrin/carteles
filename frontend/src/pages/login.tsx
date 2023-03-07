'use client';
import Layout from "@/components/Layout";
import routes from "@/routes";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { LoginSchema } from "@/components/schemas";
import Router from "next/router";
import { useState } from "react";
import { constants } from "@/lib/components/constants";


function LoginForm({ onSubmit }) {
  // TODO: Borrar esto
  const initialValues = {
    email: "facundo.ferrin@gmail.com",
    password: "123123123",
  }

  async function handleSubmit(values, { resetForm }) {
    await onSubmit(values)
    resetForm({})
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
    >
      {({ values, errors, isSubmitting }) => {
        return (
          <Form className="space-y-4 md:space-y-6" noValidate>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Correo Electrónico
              </label>
              <Field
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@email.com"
                required=""
              />
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <ErrorMessage name="email"/>
              </p>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Contraseña
              </label>
              <Field
                type="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              {/*<div className="flex items-start">*/}
              {/*  <div className="flex items-center h-5">*/}
              {/*    <input id="remember" aria-describedby="remember" type="checkbox"*/}
              {/*           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"*/}
              {/*           required=""/>*/}
              {/*  </div>*/}
              {/*  <div className="ml-3 text-sm">*/}
              {/*    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>*/}
              {/*  </div>*/}
              {/*</div>*/}
              <a
                href={routes.forgotPassword}
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Olvidé mi contraseña
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Iniciar sesión
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

function useLoginUser() {
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const client = useSupabaseClient()

  async function loginUser({ email, password }) {
    setIsSubmitting(true)
    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      console.log(error?.message)
      setError(error?.message)
    } else
      console.log(data)
    setIsSubmitting(false)
  }

  return { loginUser, error, isSubmitting }
}

function LoginPage() {
  const { error, isSubmitting, loginUser } = useLoginUser()

  async function handleOnSubmit(values) {
    loginUser({
      email: values.email,
      password: values.password,
    })
    if (!isSubmitting && !error)
      Router.push(routes.home)
  }

  return (
    <Layout>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href={routes.home} className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            {constants.companyName}
          </a>
          <div
            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Inicia sesión en tu cuenta
              </h1>
              <LoginForm onSubmit={handleOnSubmit}/>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                ¿No tienes cuenta aún?&nbsp;
                <a
                  href={routes.signUp}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Regístrate
                </a>
              </p>
              {/*<SocialLinks/>*/}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default LoginPage