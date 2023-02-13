'use client'

import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import type { NextPage } from 'next';
import { useEffect, useMemo, useState } from 'react';
import styles from '@/styles/Home.module.css';
import { Board, Location } from "@/types";
import Form from "@/components/form";
import { filterByDistance, getBoards } from "@/services";
import { Layout } from "@/components/Layout";

const useBoards = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getBoards()
      .then(data => {
        setBoards(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { boards, loading, error };
}

const useFilterByDistance = (distance: number): Board[] => {
  const [boards, setBoards] = useState<Board[]>([]);
  useEffect(() => {
    filterByDistance(distance).then(setBoards)
  }, [])

  return boards
}

// https://dev.to/99darshan/build-interactive-maps-in-nextjs-using-google-maps-api-5ajh
const Home: NextPage = () => {
  // @ts-ignore
  const [selectedBoard, setSelectedBoard] = useState<Board>({});
  const [distance, setDistance] = useState<number>(100);
  const filtered = useFilterByDistance(distance)
  const { boards, loading, error } = useBoards()
  const libraries = useMemo( () => [ 'places' ], [] );
  // const mapCenter = useMemo(
  //   () => ( { lat: 27.672932021393862, lng: 85.31184012689732 } ),
  //   [boards]
  // );
  const mapCenter: Location = { lat: 27.672932021393862, lng: 85.31184012689732 }

  function onMarkerClick(board: Board) {
    setSelectedBoard(board);
  };

  const displayInfoWindow = (id: number) => {
    // TODO: Possible performance issue: It's called for every board
    if (Object.keys(selectedBoard).length !== 0 && selectedBoard.id === id)
      return (
        <InfoWindow
          position={selectedBoard.location}
          // onCloseClick={() => setSelectedBoard({})}
        >
          <div>
            <h1>{selectedBoard.name}</h1>
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
      <div className={ styles.homeWrapper }>
        <div className={ styles.sidebar }>
          <p>This is Sidebar...</p>
          <Form handleOnSubmit={console.log}/>
        </div>
        <GoogleMap
          options={ mapOptions }
          zoom={ 14 }
          center={ mapCenter }
          mapTypeId={ google.maps.MapTypeId.ROADMAP }
          mapContainerStyle={ { width: '800px', height: '800px' } }
          onLoad={ () => console.log( 'Map Component Loaded...' ) }
        >
          {boards.filter(b => b.location).map(board => (
            <Marker
              key={board.id}
              position={board.location}
              onClick={() => onMarkerClick(board)}
            >
              {displayInfoWindow(board.id)}
            </Marker>
          ))}
        </GoogleMap>
      </div>
    </Layout>
  );
};

export default Home;