'use client';
import './globals.css'
import styles from "@/backup_app/page.module.css";
import { useEffect, useState } from "react";
import { User } from "@/types";
import { getLoggedUser } from "@/services";
import Link from "next/link";
import { store } from '@/state/store';
import { Provider, useDispatch } from "react-redux";
import { setNotification } from "@/state/reducers/notification";

const useLoggedUser = () => {
  const [user, setUser] = useState<User|null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getLoggedUser()
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { user, loading, error };
}
export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  const [loggedUser, setLoggedUser] = useState<User|null>(null)
  const {user, loading, error} = useLoggedUser()
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   setLoggedUser(user)
  // }, [user])

  const routes = [
    {text: "Carteles Pepe", href: "/"},
    {text: "Carteles", href: "/boards"},
    {text: "Usuarios", href: "/users"},
    {text: "Compañías", href: "/companies"},
    {text: "Contacto", href: "/contact"},
  ]


  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <main className={styles.main}>
            <div className={styles.description}>
              {routes.map(r => <p key={r.href}><Link href={r.href}>{r.text}</Link></p>)}
              { loggedUser ?
                <p>
                  Bienvenido {loggedUser.username}
                </p> : <p>Logueate</p>
              }
            </div>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
