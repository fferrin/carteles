import React from 'react'
import {Form, Formik} from 'formik'
import FieldInput from './FieldInput'
import {ContactSchema} from './schemas'

const ContactFormV2 = ({onSubmit, firstName, lastName, email}) => {
  const initialValues = {
    firstName: firstName || '',
    lastName: lastName || '',
    email: email || '',
    message: '',
  }
  const handleSubmit = async (values, {resetForm}) => {
    onSubmit(values)
    resetForm({})
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
    >
      {({values, errors, isSubmitting}) => {
        return (
          <Form className="rd-form rd-mailform">
            <div className="row row-20 row-md-30">
              <div className="col-lg-6">
                <div className="row row-20 row-md-30">
                  <div className="col-sm-6">
                    <FieldInput
                      id="firstName"
                      type="text"
                      name="firstName"
                      label="Nombre"
                      initialValue={values.firstName}
                      hasErrors={errors.firstName}
                    />
                  </div>
                  <div className="col-sm-6">
                    <FieldInput
                      id="lastName"
                      type="text"
                      name="lastName"
                      label="Apellido"
                      initialValue={values.lastName}
                      hasErrors={errors.lastName}
                    />
                  </div>
                  <div className="col-sm-12">
                    <FieldInput
                      id="email"
                      type="text"
                      // type="email" -- Prefer custom error message over browser
                      name="email"
                      label="Email"
                      initialValue={values.email}
                      hasErrors={errors.email}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <FieldInput
                  id="message"
                  type="textarea"
                  name="message"
                  label="Mensaje"
                  initialValue={values.message}
                  fieldClass="textarea-lg form-control-last-child"
                  hasErrors={errors.message}
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="button button-lg button-primary button-zakaria"
            >
              Enviar
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

const ContactForm = ({onSubmit, firstName, lastName, email}) => {
  const initialValues = {
    firstName: firstName || '',
    lastName: lastName || '',
    email: email || '',
    message: '',
  }
  const handleSubmit = async (values, {resetForm}) => {
    onSubmit(values)
    resetForm({})
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact
          Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical
          issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know.</p>
        <form action="#" className="space-y-8">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your
              email</label>
            <input type="email" id="email"
                   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                   placeholder="name@flowbite.com" required/>
          </div>
          <div>
            <label htmlFor="subject"
                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
            <input type="text" id="subject"
                   className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                   placeholder="Let us know how we can help you" required/>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your
              message</label>
            <textarea id="message" rows="6"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Leave a comment..."/>
          </div>
          <button type="submit"
                  className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send
            message
          </button>
        </form>
      </div>
    </section>
  )
}

export default ContactForm;
