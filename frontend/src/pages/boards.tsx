'use client'

import type { NextPage } from 'next';
import Layout from "@/components/Layout";
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useEffect, useMemo, useState } from "react";
import { mapStyles } from "@/styles/mapStyles";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from "next/router";

export function LocationPicker({ location, setLocation, address, setAddress }) {
  async function fetchAddress() {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=AIzaSyC1x10CZ9pr0r17_uOlni0kVFzSFMC8j_s`);
      const data = await response.json();
      if (data.results[0]) {
        const addresss = data.results[0].formatted_address
        setAddress(addresss);
      } else {
        setAddress('Address not found');
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleMarkerDragEnd(event) {
    // When the marker is dragged to a new position, update the state with the new position
    setLocation({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
    fetchAddress()
  }

  const libraries = useMemo(() => ['places'], []);
  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      draggingCursor: "pointer",
      draggableCursor: "default",
      clickableIcons: true,
      scrollwheel: true,
      styles: mapStyles,
      zoomControl: true,
      zoomControlOptions: {
        // El script se carga asíncrono, entonces hay que esperar a que cargue
        position: typeof google !== "undefined" ? google.maps.ControlPosition.RIGHT_BOTTOM : null
      }
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC1x10CZ9pr0r17_uOlni0kVFzSFMC8j_s",
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    )
  }

  return (
    <div className="block h-80">
      <GoogleMap
        options={mapOptions}
        zoom={14}
        center={location}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        // mapContainerStyle={{ width: '800px', height: '500px' }}
        onLoad={() => console.log('Map Component Loaded...')}
        onClick={handleMarkerDragEnd}
      >
        <Marker
          position={location}
          draggable
          onDragEnd={handleMarkerDragEnd}
        />
      </GoogleMap>
      <p className="block mt-2 text-sm font-medium text-gray-900 dark:text-white text-right">
        {address}
      </p>
    </div>
  );
}

function NewBoardForm({ onSubmit }) {
  const user = useUser()
  const client = useSupabaseClient()
  const [address, setAddress] = useState("")
  const [location, setLocation] = useState({
    lat: 40.807313,
    lng: -73.946713,
  })

  useEffect(() => {
    if ('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ lat: latitude, lng: longitude })
      })
    }
  }, [])
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

  async function handleOnSubmit(values, { resetForm }) {
    console.log("POR INSERTAR", JSON.stringify(values))
    const { error } = await client.rpc('create_board', {
      name: values.name,
      address: values.address,
      currency: values.currency,
      location,
      owner: user?.id,
      price: values.price,
      width: values.width,
      height: values.height,
    })
    console.log("INSERTADO")
    if (error)
      console.error(error.message)
    // loginUser({
    //   email: values.email,
    //   password: values.password,
    // })
    // if (!isSubmitting && !error)
    //   Router.push(routes.home)
    resetForm({})
    onSubmit()
  }

  return (
    <Formik
      initialValues={initialValues}
      // validationSchema={LoginSchema}
      onSubmit={handleOnSubmit}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
    >
      {({ values, errors, isSubmitting }) => {
        return (
          <Form action="#">
            <div className="grid gap-4 sm:grid-cols-4 sm:gap-6">
              <div className="col-span-4">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Nombre del cartel
                </label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required=""
                />
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  <ErrorMessage name="name"/>
                </p>
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
              {/*<div className="col-span-2">*/}
              {/*  <label*/}
              {/*    htmlFor="dimensions"*/}
              {/*    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"*/}
              {/*  >*/}
              {/*    Dimensiones*/}
              {/*  </label>*/}
              {/*  <div className="flex flex-row gap-4">*/}
              {/*    <Field*/}
              {/*      type="number"*/}
              {/*      name="width"*/}
              {/*      id="width"*/}
              {/*      className="basis-2/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"*/}
              {/*      placeholder="3"*/}
              {/*      required*/}
              {/*    />*/}
              {/*    <Field*/}
              {/*      type="number"*/}
              {/*      name="height"*/}
              {/*      id="height"*/}
              {/*      className="basis-2/3 p-2.5 block w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"*/}
              {/*      placeholder="4"*/}
              {/*      required*/}
              {/*    />*/}
              {/*  </div>*/}
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
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Descripción
                </label>
                <Field
                  id="description"
                  component="textarea"
                  name="description"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                />
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
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900:bg-primary-800"
            >
              Agregar cartel
            </button>
          </Form>
        )
      }}
    </Formik>
  )
}

// https://dev.to/99darshan/build-interactive-maps-in-nextjs-using-google-maps-api-5ajh
const NewBoardPage: NextPage = () => {
  const router = useRouter()
  return (
    <ProtectedRoute>
      <Layout>
        <section className="bg-white dark:bg-gray-900">
          <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Agrega un nuevo cartel</h2>
            {/*<NewBoardForm onSubmit={() => 1}/>*/}
            <NewBoardForm onSubmit={() => router.push(routes.search)}/>
          </div>
        </section>
      </Layout>
    </ProtectedRoute>
  );
};

export default NewBoardPage;