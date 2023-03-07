'use client';
import Layout from "@/components/Layout";
import { GoogleMap, InfoWindow, MarkerF, useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import { Board } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { mapStyles } from "@/styles/mapStyles";
import { useRouter } from "next/router";
import routes from "@/routes";
import { Todo } from "@/components/Todo";

function Blablabla() {
  return <div className="flex-auto max-w-4xl min-w-0 pt-6 lg:px-8 lg:pt-8 pb:12 xl:pb-24 lg:pb-16">
    <div className="pb-4 mb-8 border-b border-gray-200 dark:border-gray-800">
      <h1 className="inline-block mb-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white"
          id="content">Tailwind CSS Pagination - Flowbite</h1>
      <p className="mb-4 text-lg text-gray-500 dark:text-gray-400">Use the Tailwind CSS pagination element to
        indicate
        a series of content across various pages</p>
    </div>
  </div>;
}

const useBoardsNearby = (location) => {
  const client = useSupabaseClient()
  const [carteles, setCarteles] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getCarteles() {
      const { data, error, status } = await client.rpc('nearby_boards', location)
      setCarteles(data)
      setIsLoading(true)
    }

    getCarteles()

  }, [location])

  return { isLoading, carteles }
}

//const useFilterByDistance = (distance: number): Board[] => {
//  const [boards, setBoards] = useState<Board[]>([]);
//  useEffect(() => {
//    filterByDistance(distance).then(setBoards)
//  }, [])
//
//  return boards
//}

function SearchPage() {
  // @ts-ignore
  const [selectedBoard, setSelectedBoard] = useState<Board>({});
  //const filtered = useFilterByDistance(distance)
  const [center, setCenter] = useState({
    lat: 40.807313,
    lng: -73.946713,
  })
  const libraries = useMemo(() => ['places'], []);
  // const mapCenter = useMemo(
  //   () => ( { lat: 27.672932021393862, lng: 85.31184012689732 } ),
  //   [boards]
  // );
  const [mapref, setMapRef] = useState(null);
  const [showSearchButton, setShowSearchButton] = useState(false)
  const [boardUuid, setBoardUuid] = useState(null)
  const router = useRouter()
  const { isLoading, carteles: boards } = useBoardsNearby(center)

  // const { id } = router.query
  // setBoardUuid(id)
  useEffect(() => {
    const { id } = router.query
    setBoardUuid(id)
    // const selectedBoard = boards.find(b => b.uuid === boardUuid)
    // if (selectedBoard)
    //   setCenter(selectedBoard.location)
  }, [router])

  useEffect(() => {
    // console.log("CAMBIANDO UBICACION SEGUN:", boardUuid)
    // console.log("IS LOADING AND BOARDS:", isLoading, boards)
    const selectedBoard = boards.find(b => b.uuid === boardUuid)
    // console.log("SELECTED BOARD:", selectedBoard)
    if (selectedBoard)
      setCenter(selectedBoard.location)
  }, [isLoading, boardUuid])

  useEffect(() => {
    if (boardUuid) {
      router.push({
          pathname: routes.search,
          query: { id: boardUuid }
        },
        undefined,
        { shallow: true }
      )
      // } else {
      //   router.push({
      //       pathname: routes.search,
      //     },
      //     undefined,
      //     { shallow: true }
      //   )
    }
    //   const { id } = router.query
    //   setBoardUuid(id)
  }, [boardUuid])

  function handleOnLoad(map) {
    setMapRef(map);
    console.log('Map Component Loaded...')
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC1x10CZ9pr0r17_uOlni0kVFzSFMC8j_s",
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  useEffect(() => {
    if ('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setCenter({ lat: latitude, lng: longitude })
      })
    }
  }, [])
  // useEffect(() => {
  //   console.log("IS LOADED:", isLoaded)
  //   console.log("MAP REF CURRENT:", mapRef.current)
  //   if (isLoaded && mapRef.current) {
  //     const bounds = new window.google.maps.LatLngBounds();
  //     boards.forEach((board) => {
  //       const { lat, lng } = board.location;
  //       const position = new window.google.maps.LatLng(lat, lng);
  //       bounds.extend(position);
  //     });
  //     console.log("INTERNAL BOUNDS:", bounds)
  //     console.log(mapRef.current)
  //     // mapRef.current.fitBounds(bounds)
  //   }
  // }, [isLoaded, boards]);

  function onMarkerClick(board: Board) {
    setSelectedBoard(board);
    setBoardUuid(board.uuid)
    setActiveMarker(board.uuid)
  };

  function handleOnDragEng() {
    if (mapref) {
      const newCenter = mapref.getCenter();
      setShowSearchButton(true)
    }
  }

  function handleOnClick() {
    if (mapref) {
      const newCenter = mapref.getCenter();
      const newPosition = {
        lat: newCenter.lat(),
        lng: newCenter.lng(),
      }
      setCenter(newPosition)
      setShowSearchButton(false)
    }
  }

  const [activeMarker, setActiveMarker] = useState(boardUuid)
  console.log("ACTIVE MARKER:", activeMarker)
  console.log("BOARD UUID:", boardUuid)

  const displayInfoWindow = (id: number) => {
    const bbb = boards.find(b => b.uuid === boardUuid)
    // TODO: Possible performance issue: It's called for every board
    if (bbb) {
      return (
        <InfoWindow
          position={bbb.location}
          // onCloseClick={() => setSelectedBoard({})}
        >
          <div className={"text-black"}>
            <h1>{bbb.name}</h1>
            <br/>
            <p>Qué onda el info window?</p>
          </div>
        </InfoWindow>
      );
    }
  };

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
      styles: mapStyles,
      // zoomControl: true,
      // zoomControlOptions: {
      //   position: google.maps.ControlPosition.RIGHT_BOTTOM
      // }
    }),
    []
  );

  if (!isLoaded || !boards) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    )
  }
  const bounds = new window.google.maps.LatLngBounds();
  boards.forEach((board) => {
    const { lat, lng } = board.location;
    const position = new window.google.maps.LatLng(lat, lng);
    bounds.extend(position);
  })
  // console.log("BOUNDS:", bounds)

  console.log("LOCATION:", center)
  return (
    <Layout>
      <Todo message={"Si hay board UUID, buscar los tableros cercanos a ese tablero"}/>
      <div className="h-screen md:flex">
        <div
          className="relative md:flex flex-col w-1/3 bg-white dark:bg-gray-900 i hidden">
          {/*<form className={"p-2 w-full"}>*/}
          {/*  <label htmlFor="default-search"*/}
          {/*         className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>*/}
          {/*  <div className="relative">*/}
          {/*    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">*/}
          {/*      <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"*/}
          {/*           stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">*/}
          {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"*/}
          {/*              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>*/}
          {/*      </svg>*/}
          {/*    </div>*/}
          {/*    <input type="search" id="default-search"*/}
          {/*           className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"*/}
          {/*           placeholder="Search Mockups, Logos..." required/>*/}
          {/*    <button type="submit"*/}
          {/*            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search*/}
          {/*    </button>*/}
          {/*  </div>*/}
          {/*</form>*/}
          <div className={"overflow-y-auto px-2 py-2"}>
            {boards.length == 0
              ?
              <div className="grid h-screen place-items-center">
                No hay tableros en esta zona
              </div>
              :
              boards.map((board, index) =>
                <div
                  key={board.id}
                  className={`${board.uuid === boardUuid ? 'dark:border-white dark:border-2' : 'border-gray-200 dark:border-gray-700'} flex-row p-1 mb-2 max-w-full bg-white border  rounded-lg shadow dark:bg-gray-800`}
                >
                  <div className="flex flex-row">
                    <img className="rounded-t-lg w-36 p-2 border border-gray-800 rounded-t-xl"
                         src="https://flowbite.com/docs/images/blog/image-1.jpg"
                         alt=""/>
                    <div className="flex flex-col">
                      <div>{board.name} ({index + 1})</div>
                      <span
                        className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-700 dark:text-yellow-300">New</span>
                      <div>$ 20k/mes</div>
                      <div>Rúa Formigueiros 101, Ático A, Sarria</div>
                      <div>Lugo, España</div>
                      <div>20 de Abril, 2023</div>
                      <span
                        className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-700 dark:text-yellow-300">Iluminación</span>
                      <span
                        className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-700 dark:text-yellow-300">Ruta</span>
                      <span
                        className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-700 dark:text-yellow-300">Doble Cara</span>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
        {/*<div*/}
        {/*  className="relative overflow-hidden md:flex w-1/3 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">*/}
        {/*  <div>*/}
        {/*    <h1 className="text-white font-bold text-4xl font-sans">GoFinance</h1>*/}
        {/*    <p className="text-white mt-1">The most popular peer to peer lending at SEA</p>*/}
        {/*    <button type="submit"*/}
        {/*            className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read*/}
        {/*      More*/}
        {/*    </button>*/}
        {/*  </div>*/}
        {/*  <div*/}
        {/*    className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"/>*/}
        {/*  <div*/}
        {/*    className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"/>*/}
        {/*  <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"/>*/}
        {/*  <div*/}
        {/*    className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"/>*/}
        {/*</div>*/}
        <div className="flex md:w-2/3 justify-center items-center bg-white">
          <GoogleMap
            // ref={map => map && map.getInstance().fitBounds(bounds)}
            options={mapOptions}
            zoom={14}
            center={center}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            // mapContainerStyle={ { width: '800px', height: '500px' } }
            onLoad={handleOnLoad}
            onDragEnd={handleOnDragEng}
          >
            {boards.map((board, index) => (
              <>
                <MarkerF
                  key={board.id}
                  position={board.location}
                  label={{ text: `${index + 1}`, color: '#fff' }}
                  onClick={() => onMarkerClick(board)}
                >
                  {boardUuid === board.uuid && (
                    <InfoWindow
                      position={board.location}
                      onCloseClick={() => {
                        setBoardUuid(null)
                        router.push({
                            pathname: routes.search,
                          },
                          undefined,
                          { shallow: true }
                        )
                      }}
                    >
                      <div className={"text-black"}>
                        <h1>{board.name}</h1>
                        <br/>
                        <p>Qué onda el info window?</p>
                      </div>
                    </InfoWindow>
                  )}
                </MarkerF>
              </>
            ))}
          </GoogleMap>
          {showSearchButton &&
            <button
              // className="absolute bg-white rounded-full shadow-lg px-5 py-3 text-lg font-semibold text-gray-800">
              className="absolute text-white absolute bottom-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleOnClick}
            >
              Buscar en esta zona
            </button>
          }
        </div>
      </div>
    </Layout>
  )
}

export default SearchPage