'use client';
import Layout from "@/components/Layout";
import { ForgotPasswordSchema } from "@/components/schemas";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Router from "next/router";
import routes from "@/routes";
import { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { constants } from "@/lib/components/constants";

function ForgotPasswordForm({ onSubmit }) {
  // TODO: Borrar esto
  const initialValues = {
    email: "faca981@gmail.com"
  }

  async function handleOnSubmit(values, { resetForm }) {
    await onSubmit(values)
    resetForm({})
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ForgotPasswordSchema}
      onSubmit={handleOnSubmit}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
    >
      {({ values, errors, isSubmitting }) => {
        return (
          <Form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" noValidate>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Correo electrónico
              </label>
              <Field
                type="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                <ErrorMessage name="email"/>
              </p>
            </div>
            {/*<div className="flex items-start">*/}
            {/*  <div className="flex items-center h-5">*/}
            {/*    <input id="terms" aria-describedby="terms" type="checkbox"*/}
            {/*           className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"*/}
            {/*           required=""/>*/}
            {/*  </div>*/}
            {/*  <div className="ml-3 text-sm">*/}
            {/*    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a*/}
            {/*      className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and*/}
            {/*      Conditions</a></label>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reestablecer contraseña
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

function useForgotPassword() {
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const client = useSupabaseClient()

  async function forgotPassword({ email }) {
    setIsSubmitting(true)
    const { data, error } = await client.auth.resetPasswordForEmail(email, {
      redirectTo: routes.forgotPassword,
    })
    if (error)
      console.log(error?.message)
    else
      console.log(data)
    setIsSubmitting(false)
  }

  return { forgotPassword, error, isSubmitting }
}

function ForgotPasswordPage() {
  const { error, isSubmitting, forgotPassword } = useForgotPassword()

  async function handleOnSubmit(values) {
    forgotPassword({ email: values.email })
    if (!isSubmitting)
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
            className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h1
              className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              ¿Olvidaste tu contraseña?
            </h1>
            <p className="font-light text-gray-500 dark:text-gray-400">
              ¡No te preocupes! Simplemente escribe tu correo electrónico y te enviaremos un código para restablecer
              su contraseña
            </p>
            <ForgotPasswordForm onSubmit={handleOnSubmit}/>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default ForgotPasswordPage