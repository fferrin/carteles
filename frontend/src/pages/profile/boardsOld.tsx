'use client';
import Layout from "@/components/Layout";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import UserDrawer from "@/components/UserDrawer";
import BoardCard from "@/components/Card";


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

function UserBoardsPage() {
  const user = useUser()
  const client = useSupabaseClient()
  const [boards, setBoards] = useState([])

  async function getBoards() {
    const { data, error } = await client
      // .rpc("user_boards", { user_uuid: user?.id })
      .from("boards")
      .select("*")
      .eq("owner", user?.id)
    if (data)
      setBoards(data)
  }

  useEffect(() => {
    getBoards()
  }, [user])

  // supabase.rpc('nearby_boards', {
  //   lat: 40.807313,
  //   long: -73.946713,
  // }).then(({ data }) => console.log(JSON.stringify(data)))
  return (
    // <ProtectedRoute2>
    <Layout>
      <div className="flex flex-row h-screen">
        <UserDrawer/>
        <section className={"grid grid-cols-3 p-8 gap-8"}>
          <h1>PONER COMO TABLA</h1>
          {boards.map(board => (
            <BoardCard key={board.id} board={board}/>
          ))}
        </section>
      </div>
    </Layout>
    // </ProtectedRoute2>
  )
}

export default UserBoardsPage

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