'use client'

import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { createCompany } from "@/services";
import { generateRandomNumber } from "@/utils";
import { Board, Company } from "@/types";

const useCompanies = () => {
  const [company, setCompany] = useState<Company>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    createCompany(`Compañía #${generateRandomNumber(0, 10).toFixed(3)}`)
      .then(res => res.json())
      .then(data => {
        setCompany(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { company, loading, error };
}

// https://dev.to/99darshan/build-interactive-maps-in-nextjs-using-google-maps-api-5ajh
const Page: NextPage = () => {
  const [createdCompany, setCreatedCompany] = useState<Company>(null)
  const { company, loading, error } = useCompanies()

  return (
    <div>
      <button onClick={() => setCreatedCompany(company)}>
        CREAR Companía
      </button>
      <br/><br/>
      Companía: {JSON.stringify(createdCompany)}
    </div>
  );
};

export default Page;