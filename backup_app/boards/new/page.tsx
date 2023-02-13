'use client'

import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { createBoard } from "@/services";
import { generateRandomNumber } from "@/utils";
import { Board } from "@/types";

const useBoards = () => {
  const [board, setBoard] = useState<Board|null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

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

  return { board, loading, error };
}

// https://dev.to/99darshan/build-interactive-maps-in-nextjs-using-google-maps-api-5ajh
const CreateBoard: NextPage = () => {
  const [createdBoard, setCreatedBoard] = useState<Board|null>(null)
  const { board, loading, error } = useBoards()

  return (
    <div>
      <button onClick={() => setCreatedBoard(board)}>
        CREAR NUEVO TABLERO
      </button>
      <br/><br/>
      BOARD: {JSON.stringify(createdBoard)}
    </div>
  );
};

export default CreateBoard;