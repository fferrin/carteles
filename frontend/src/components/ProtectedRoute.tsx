'use client';

import routes from "@/routes";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";

const isBrowser = typeof window !== 'undefined'

const ProtectedRoute = ({ children }) => {
  const user = useUser()
  const router = useRouter()

  if (isBrowser && !user && location.pathname !== routes.login()) {
    router.push(routes.login(location.pathname))
    return
  }
  return children
}

export default ProtectedRoute