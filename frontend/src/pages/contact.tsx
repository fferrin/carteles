'use client';

import { useState } from "react";
import Router from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Layout from "@/components/Layout";
import ContactForm from "@/components/FormContact";
import routes from "@/routes";


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

function Contact() {
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
    <Layout>
      <ContactForm
        email={user?.email}
        onSubmit={handleOnSubmit}
      />
    </Layout>
  )
}

export default Contact

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