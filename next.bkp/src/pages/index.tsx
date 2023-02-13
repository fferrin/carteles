'use client';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '../styles/page.module.css';
import {getBoards} from "@/services";
import { useEffect, useState } from "react";
import Link from "next/link";
import { store } from "@/state/store";
import { User } from "@/types";
import { useDispatch } from "react-redux";
import { setNotification } from "@/state/reducers/notification";
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const dispatch = useDispatch()
  dispatch(setNotification("AKSDHAKSJ"))
  const [loggedUser, setLoggedUser] = useState<User|null>(null)
  useEffect(() => {
    getBoards()
        .catch(console.error)
        .then(console.log)
  })

  const routes = [
    {text: "Carteles Pepe", href: "/"},
    {text: "Carteles", href: "/boards"},
    {text: "Usuarios", href: "/users"},
    {text: "Compañías", href: "/companies"},
    {text: "Contacto", href: "/contact"},
  ]
  return (
      <main className={styles.main}>
    {/*<Provider store={store}>*/}
        <div className={styles.description}>
          {routes.map(r => <p key={r.href}><Link href={r.href}>{r.text}</Link></p>)}
          { loggedUser ?
            <p>
              Bienvenido {loggedUser.username}
            </p> : <p>Logueate</p>
          }
        </div>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <div className={styles.thirteen}>
          <Image src="/thirteen.svg" alt="13" width={40} height={31} priority />
        </div>
      </div>

      <div className={styles.grid}>
        <a
          href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Docs <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Templates <span>-&gt;</span>
          </h2>
          <p className={inter.className}>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Deploy <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    {/*</Provider>*/}
      </main>
  )
}
