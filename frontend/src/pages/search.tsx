'use client';
import Layout from "@/components/Layout";
import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";
import { Board, Location } from "@/types";
import { filterByDistance, getBoards } from "@/services";

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

const mapStyles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]
const useBoards = () => {
  const [ boards, setBoards ] = useState<Board[]>( [] );
  const [ loading, setLoading ] = useState<boolean>( false );
  const [ error, setError ] = useState( null );

  useEffect( () => {
    setLoading( true );
    getBoards()
      .then( data => {
        setBoards( data );
        setLoading( false );
      } )
      .catch( error => {
        setError( error );
        setLoading( false );
      } );
  }, [] );

  return { boards, loading, error };
}

const useFilterByDistance = ( distance: number ): Board[] => {
  const [ boards, setBoards ] = useState<Board[]>( [] );
  useEffect( () => {
    filterByDistance( distance ).then( setBoards )
  }, [] )

  return boards
}

function Search() {
  // @ts-ignore
  const [ selectedBoard, setSelectedBoard ] = useState<Board>( {} );
  const [ distance, setDistance ] = useState<number>( 100 );
  const filtered = useFilterByDistance( distance )
  const { boards, loading, error } = useBoards()
  const libraries = useMemo( () => [ 'places' ], [] );
  // const mapCenter = useMemo(
  //   () => ( { lat: 27.672932021393862, lng: 85.31184012689732 } ),
  //   [boards]
  // );
  const mapCenter: Location = { lat: 27.672932021393862, lng: 85.31184012689732 }

  function onMarkerClick( board: Board ) {
    setSelectedBoard( board );
  };

  const displayInfoWindow = ( id: number ) => {
    // TODO: Possible performance issue: It's called for every board
    if ( Object.keys( selectedBoard ).length !== 0 && selectedBoard.id === id )
      return (
        <InfoWindow
          position={ selectedBoard.location }
          // onCloseClick={() => setSelectedBoard({})}
        >
          <div>
            <h1>{ selectedBoard.name }</h1>
            <br/>
            <p>Qué onda el info window?</p>
          </div>
        </InfoWindow>
      );
  };

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ( {
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: true,
      styles: mapStyles
    } ),
    []
  );

  const { isLoaded } = useLoadScript( {
    googleMapsApiKey: "AIzaSyC1x10CZ9pr0r17_uOlni0kVFzSFMC8j_s",
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  } );

  if ( !isLoaded ) {
    return (
      <Layout>
        <p>Loading...</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="h-screen md:flex">
        <div
          className="relative  md:flex flex-col w-1/3 bg-gradient-to-tr from-blue-800 to-purple-700 i  hidden">
          <form className={ "p-2 w-full" }>
            <label htmlFor="default-search"
                   className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none"
                     stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <input type="search" id="default-search"
                     className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="Search Mockups, Logos..." required/>
              <button type="submit"
                      className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search
              </button>
            </div>
          </form>
          <div className={ "overflow-y-auto px-2" }>
            { [ 1, 2, 3 ].map( x => <div key={ x }
                                         className={ "flex-row pb-2 max-w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" }>
              <div className="flex flex-row">
                <img className="rounded-t-lg w-36 p-2 border border-gray-800 rounded-t-xl"
                     src="https://flowbite.com/docs/images/blog/image-1.jpg"
                     alt=""/>
                <div className="flex flex-col">
                  <div>Company name</div>
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
            </div> ) }
          </div>
        </div>
        {/*<div*/ }
        {/*  className="relative overflow-hidden md:flex w-1/3 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">*/ }
        {/*  <div>*/ }
        {/*    <h1 className="text-white font-bold text-4xl font-sans">GoFinance</h1>*/ }
        {/*    <p className="text-white mt-1">The most popular peer to peer lending at SEA</p>*/ }
        {/*    <button type="submit"*/ }
        {/*            className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read*/ }
        {/*      More*/ }
        {/*    </button>*/ }
        {/*  </div>*/ }
        {/*  <div*/ }
        {/*    className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"/>*/ }
        {/*  <div*/ }
        {/*    className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"/>*/ }
        {/*  <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"/>*/ }
        {/*  <div*/ }
        {/*    className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"/>*/ }
        {/*</div>*/ }
        <div className="flex md:w-2/3 justify-center items-center bg-white">
          <GoogleMap
            options={ mapOptions }
            zoom={ 14 }
            center={ mapCenter }
            mapTypeId={ google.maps.MapTypeId.ROADMAP }
            mapContainerStyle={ { width: '100%', height: '100%' } }
            // mapContainerStyle={ { width: '800px', height: '500px' } }
            onLoad={ () => console.log( 'Map Component Loaded...' ) }
          >
            { boards.filter( b => b.location ).map( board => <Marker
              key={ board.id }
              position={ board.location }
              onClick={ () => onMarkerClick( board ) }
            >
              { displayInfoWindow( board.id ) }
            </Marker> ) }
          </GoogleMap>
        </div>
      </div>
    </Layout>
  )
}

export default Search