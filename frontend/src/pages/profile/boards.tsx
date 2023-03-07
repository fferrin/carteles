'use client';
import Layout from "@/components/Layout";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import UserDrawer from "@/components/UserDrawer";
import { FaEdit, FaEye } from "react-icons/fa";
import { useRouter } from "next/router";
import routes from "@/routes";
import { ContactSchema } from "@/components/schemas";
import { Field, Form, Formik } from "formik";
import { LocationPicker } from "@/pages/boards";
import Link from "next/link";


function TableFooter() {
  return (
    <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
         aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span className="font-semibold text-gray-900 dark:text-white">1-10</span>
                    of
                    <span className="font-semibold text-gray-900 dark:text-white">1000</span>
                </span>
      <ul className="inline-flex items-stretch -space-x-px">
        <li>
          <a href="#"
             className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Previous</span>
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"/>
            </svg>
          </a>
        </li>
        <li>
          <a href="#"
             className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
        </li>
        <li>
          <a href="#"
             className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
        </li>
        <li>
          <a href="#" aria-current="page"
             className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
        </li>
        <li>
          <a href="#"
             className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
        </li>
        <li>
          <a href="#"
             className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
        </li>
        <li>
          <a href="#"
             className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span className="sr-only">Next</span>
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"/>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  )
}

function TableHeader() {
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
      <div className="w-full md:w-1/2">
        <form className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                   viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"/>
              </svg>
            </div>
            <input type="text" id="simple-search"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                   placeholder="Search" required/>
          </div>
        </form>
      </div>
      <div
        className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
        <button type="button"
                className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
          <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20"
               xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path clipRule="evenodd" fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/>
          </svg>
          Add product
        </button>
        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button id="actionsDropdownButton" data-dropdown-toggle="actionsDropdown"
                  className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  type="button">
            <svg className="-ml-1 mr-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clipRule="evenodd" fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
            </svg>
            Actions
          </button>
          <div id="actionsDropdown"
               className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="actionsDropdownButton">
              <li>
                <a href="#"
                   className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mass
                  Edit</a>
              </li>
            </ul>
            <div className="py-1">
              <a href="#"
                 className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete
                all</a>
            </div>
          </div>
          <button id="filterDropdownButton" data-dropdown-toggle="filterDropdown"
                  className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  type="button">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="h-4 w-4 mr-2 text-gray-400"
                 viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd"
                    d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                    clipRule="evenodd"/>
            </svg>
            Filter
            <svg className="-mr-1 ml-1.5 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path clipRule="evenodd" fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
            </svg>
          </button>
          <div id="filterDropdown"
               className="z-10 hidden w-48 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
            <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">Choose brand</h6>
            <ul className="space-y-2 text-sm" aria-labelledby="filterDropdownButton">
              <li className="flex items-center">
                <input id="apple" type="checkbox" value=""
                       className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                <label htmlFor="apple" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Apple
                  (56)</label>
              </li>
              <li className="flex items-center">
                <input id="fitbit" type="checkbox" value=""
                       className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                <label htmlFor="fitbit" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Microsoft
                  (16)</label>
              </li>
              <li className="flex items-center">
                <input id="razor" type="checkbox" value=""
                       className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                <label htmlFor="razor" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Razor
                  (49)</label>
              </li>
              <li className="flex items-center">
                <input id="nikon" type="checkbox" value=""
                       className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                <label htmlFor="nikon" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">Nikon
                  (12)</label>
              </li>
              <li className="flex items-center">
                <input id="benq" type="checkbox" value=""
                       className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                <label htmlFor="benq" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100">BenQ
                  (74)</label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function useSendContactMessage() {
  const [error, setError] = useState("")
  const client = useSupabaseClient()

  async function sendContactMessage({ email, subject, message, isAnonymous }) {
    const { error } = await client
      .from('user_contacts')
      .insert({ email, subject, message, is_anonymous: isAnonymous })
    if (error) setError(error.message)
  }

  return { sendContactMessage, error }
}

function UpdateBoardForm() {
  const user = useUser()
  const [address, setAddress] = useState("")
  const [location, setLocation] = useState({
    lat: 43.807313,
    lng: -73.946713,
  })
  const initialValues = {
    name: "initial name",
    price: 123.45,
    currency: "ARS",
    address,
    location,
    description: "Description",
    owner: user?.id,
    height: 3,
    width: 5,
  }
  const handleSubmit = () => {
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
      {({ values, errors, isSubmitting }) => {
        return (
          <Form action="#">
            <div className="grid gap-4 mb-4 sm:grid-cols-4">
              <div className="col-span-4">
                <label htmlFor="name"
                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nombre del cartel
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Precio
                </label>
                <div className="flex flex-row gap-4">
                  <Field
                    type="number"
                    name="price"
                    id="price"
                    className="basis-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                    required
                  />
                  <Field
                    name="currenty"
                    className="basis-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    as="select"
                  >
                    <option defaultValue="ARS">ARS</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </Field>
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="width"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ancho
                </label>
                <div className="flex flex-row gap-4">
                  <div className="relative">
                    <Field
                      type="number"
                      name="width"
                      id="width"
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="4"
                      required
                    />
                    <span className="absolute right-0 text-gray-500 pt-2 pr-4 text-sm">m</span>
                  </div>
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="height"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Altura
                </label>
                <div className="relative">
                  <Field
                    type="number"
                    name="height"
                    id="height"
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="4"
                    required
                  />
                  <span className="absolute right-0 text-gray-500 pt-2 pr-4 text-sm">m</span>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Descripción
                </label>
                <Field
                  id="description"
                  name="description"
                  component="textarea"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                </Field>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ubicación
                </label>
                <LocationPicker
                  location={location}
                  setLocation={setLocation}
                  address={address}
                  setAddress={setAddress}
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Actualizar cartel
              </button>
              <button
                type="button"
                className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
              >
                <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                     xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Borrar
              </button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

function UserBoardsPage() {
  const user = useUser()
  const client = useSupabaseClient()
  const [boards, setBoards] = useState([])
  const router = useRouter()
  const boardUuid = "aksdjalks"

  async function getBoards() {
    const { data, error } = await client
      // .rpc("user_boards", { user_uuid: user?.id })
      .from("boards")
      .select("*")
      .eq("owner", user?.id)
    if (data)
      setBoards(data)
  }

  useEffect(() => {
    getBoards()
  }, [user])

  return (
    // <ProtectedRoute2>
    <Layout>
      <section className="flex flex-row h-screen">
        <UserDrawer/>
        <div className="w-full p-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            {/*<TableHeader/>*/}
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">Nombre cartel</th>
                  <th scope="col" className="px-4 py-3">Dirección</th>
                  <th scope="col" className="px-4 py-3">Descripción</th>
                  <th scope="col" className="px-4 py-3">Precio Mensual</th>
                  <th scope="col" className="px-4 py-3">Dimensiones</th>
                  <th scope="col" className="px-4 py-3">Acciones</th>
                </tr>
                </thead>
                <tbody>
                {boards.map(board => (
                  <tr
                    key={board.id}
                    className="border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >{board.name}</th>
                    <td className="px-4 py-3 text-ellipsis">{board.address}</td>
                    <td className="px-4 py-3 text-ellipsis">{board.description}</td>
                    <td className="px-4 py-3 text-right">{new Intl.NumberFormat("es-ES", {
                      style: "currency",
                      currency: board.currency,
                    }).format(board.price)}</td>
                    <td className="px-4 py-3">{board.width} x {board.height} m<sup>2</sup></td>
                    <td className="px-4 py-3 text-center gap-4">
                      <button>
                        <FaEye className={"text-lg"} onClick={() => router.push(routes.boardById(board.uuid))}/>
                      </button>
                      <button id="updateProductButton" data-modal-toggle="updateBoardModal"
                        // className="block text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                              type="button">
                        <Link href={{ pathname: routes.userBoards, query: { id: boardUuid } }} replace>
                          <FaEdit className={"text-lg"}/>
                        </Link>
                      </button>
                      {/*<button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown"*/}
                      {/*        className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"*/}
                      {/*        type="button">*/}
                      {/*  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"*/}
                      {/*       xmlns="http://www.w3.org/2000/svg">*/}
                      {/*    <path*/}
                      {/*      d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"/>*/}
                      {/*  </svg>*/}
                      {/*</button>*/}
                      {/*<div id="apple-imac-27-dropdown"*/}
                      {/*     className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">*/}
                      {/*  <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"*/}
                      {/*      aria-labelledby="apple-imac-27-dropdown-button">*/}
                      {/*    <li>*/}
                      {/*      <a href="#"*/}
                      {/*         className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>*/}
                      {/*    </li>*/}
                      {/*    <li>*/}
                      {/*      <a href="#"*/}
                      {/*         className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>*/}
                      {/*    </li>*/}
                      {/*  </ul>*/}
                      {/*  <div className="py-1">*/}
                      {/*    <a href="#"*/}
                      {/*       className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>*/}
                      {/*  </div>*/}
                      {/*</div>*/}
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
            {/*<TableFooter/>*/}
          </div>
          <div
            id="updateBoardModal"
            tabIndex="-1"
            aria-hidden="true"
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full hidden"
          >
            <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
              <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                <div
                  className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Actualizar cartel
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="updateBoardModal"
                  >
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="sr-only">Cerrar modal</span>
                  </button>
                </div>
                <UpdateBoardForm/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
    // </ProtectedRoute2>
  )
}

export default UserBoardsPage

/*
create or replace function nearby_boards(lat float, lng float)
returns setof record
language sql
as $$
  select
    id,
    name,
    json_build_object('lng', ST_X(location::geometry), 'lat', ST_Y(location::geometry)) as location,
    st_distance(location, st_point(lng, lat)::geography) as dist_meters
  from public.boards
  order by location <-> st_point(lng, lat)::geography;
$$;
 */