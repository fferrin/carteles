'use client';
import Layout from "@/components/Layout";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import Router from "next/router";
import routes from "@/routes";
import UserDrawer from "@/components/UserDrawer";


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

function ProfilePage() {
  const user = useUser()
  const { error, sendContactMessage } = useSendContactMessage()

  async function handleOnSubmit(values) {
    sendContactMessage({
      email: values.email,
      subject: values.subject,
      message: values.message,
      isAnonymous: !user
    })
    Router.push(routes.home)
  }

  // supabase.rpc('nearby_boards', {
  //   lat: 40.807313,
  //   long: -73.946713,
  // }).then(({ data }) => console.log(JSON.stringify(data)))
  return (
    // <ProtectedRoute>
    <Layout>
      <div className="flex flex-row">
        <UserDrawer/>
        <section className={"w-full bg-amber-600"}>
          asdasd
        </section>
      </div>
    </Layout>
    // </ProtectedRoute>
  )
}

export default ProfilePage

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