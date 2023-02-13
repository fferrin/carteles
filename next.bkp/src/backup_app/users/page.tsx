'use client'

import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { createBoard } from "@/services";
import { generateRandomNumber } from "@/utils";
import { Board, Location } from "@/types";

const useBoards = () => {
  const [board, setBoard] = useState<Board>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    createBoard(`PRUEBA #${generateRandomNumber(0, 10).toFixed(3)}`, {
      lat: generateRandomNumber(27.60, 27.70),
      lng: generateRandomNumber(85.30, 85.40)
    })
      .then(res => res.json())
      .then(data => {
        setBoard(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { company: board, loading, error };
}

// https://dev.to/99darshan/build-interactive-maps-in-nextjs-using-google-maps-api-5ajh
const Page: NextPage = () => {
  const [createdBoard, setCreatedBoard] = useState<Board>(null)
  const { board, loading, error } = useBoards()

  return (
    <div>
      <button onClick={() => setCreatedBoard(board)}>
        CREAR USUARIO
      </button>
      <br/><br/>
      Usuario: {JSON.stringify(createdBoard)}
    </div>
  );
};

export default Page;