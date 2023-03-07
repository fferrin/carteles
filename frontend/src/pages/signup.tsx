'use client';
import Layout from "@/components/Layout";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { SignUpSchema } from "@/components/schemas";
import Router from "next/router";
import routes from "@/routes";
import { useState } from "react";
import { constants } from "@/lib/components/constants";

function SignUpForm({ onSubmit }) {
  // TODO: Borrar esto
  const initialValues = {
    email: "facundo.ferrin@gmail.com",
    password: "123123123",
    repeatPassword: "123123123",
  }
  const handleSubmit = async (values, { resetForm }) => {
    await onSubmit(values)
    resetForm({})
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignUpSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
    >
      {({ values, errors, isSubmitting }) => {
        return (
          <Form className="space-y-4 md:space-y-6" noValidate>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Correo electrónico
              </label>
              <Field
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe@gmail.com"
                required
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
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <ErrorMessage name="password"/>
              </p>
            </div>
            <div>
              <label
                htmlFor="repeatPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Repite tu contraseña
              </label>
              <Field
                type="password"
                name="repeatPassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
                required
              />
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <ErrorMessage name="repeatPassword"/>
              </p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Crear cuenta
            </button>
            {/*<button disabled type="button"*/}
            {/*        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">*/}
            {/*  <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin"*/}
            {/*       viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
            {/*    <path*/}
            {/*      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"*/}
            {/*      fill="#E5E7EB"/>*/}
            {/*    <path*/}
            {/*      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"*/}
            {/*      fill="currentColor"/>*/}
            {/*  </svg>*/}
            {/*  Loading...*/}
            {/*</button>*/}
          </Form>
        )
      }}
    </Formik>
  )
}

function useCreateUser() {
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const client = useSupabaseClient()

  async function createUser({ email, password }) {
    setIsSubmitting(true)
    const { data, error } = await client.auth.signUp({ email, password })
    if (error)
      console.log(error?.message)
    else
      console.log(data)
    setIsSubmitting(false)
  }

  return { createUser, error, isSubmitting }
}

function SignUpPage() {
  const { error, isSubmitting, createUser } = useCreateUser()

  async function handleOnSubmit(values) {
    createUser({
      email: values.email,
      password: values.password,
    })
    if (!isSubmitting)
      Router.push(routes.home)
  }

  return (
    <Layout>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href={routes.home} className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="/logo.svg" alt="logo"/>
            {constants.companyName}
          </a>
          <div
            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Crear una cuenta
              </h1>
              <SignUpForm onSubmit={handleOnSubmit}/>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                ¿Ya tienes cuenta?&nbsp;
                <a
                  href={routes.login()}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Inicia sesión
                </a>
              </p>
              {/*<p className="text-sm font-light text-gray-500 dark:text-gray-400">*/}
              {/*  O usa tus redes sociales*/}
              {/*</p>*/}
              {/*<SocialLinks/>*/}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default SignUpPage