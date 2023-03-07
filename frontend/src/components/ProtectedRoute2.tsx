'use client';

import routes from "@/routes";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";

const isBrowser = typeof window !== 'undefined'

const ProtectedRoute2 = ({ children }) => {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = isBrowser && !user && location.pathname !== routes.login();
    if (isAuthenticated) {
      router.push(routes.login(location.pathname))
    }
  }, [])

  return <>{children}</>
}

export default ProtectedRoute2
