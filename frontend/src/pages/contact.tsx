'use client';
import { useDispatch } from "react-redux";
import Layout from "@/components/Layout";
import ContactForm from "@/components/FormContact";


function Contact() {
  const dispatch = useDispatch()
  // store.dispatch( loadUser() )
  // useEffect(() => {
  //   getBoards()
  //     .catch(console.error)
  //     .then(console.log)
  // })

  return (
    <Layout>
      <ContactForm/>
    </Layout>
  )
}

export default Contact