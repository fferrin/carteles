import { useState } from "react";
import Link from "next/link";
import { User } from "@/types";
import routes from "@/routes";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { constants } from "@/lib/components/constants";

function Footer() {
  return (
    <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl text-center">
        <Link href="#"
              className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white">
          <img src="/logo.svg" className="mr-3 h-6 sm:h-9" alt={`${constants.companyName} Logo`}/>
          {constants.companyName}
        </Link>
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023
        </span>
      </div>
    </footer>
  )
}

function Header() {
  const client = useSupabaseClient()
  const user = useUser()
  const navRoutes = [
    { label: "Inicio", href: routes.home },
    { label: "Carteles", href: routes.search },
    { label: "Contacto", href: routes.contact },
  ]

  async function signOut() {
    const { error } = await client.auth.signOut()
    if (error) console.log(error)
    else console.log("DESLOGUEADO")
  }

  function handleLogOut() {
    console.log("LOGGING OUT")
    signOut()
  }

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href={routes.home} className="flex items-center">
            <img src="/logo.svg" className="mr-3 h-6 sm:h-9" alt={`${constants.companyName} Logo`}/>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
          {constants.companyName}
        </span>
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              href={routes.boards}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              <svg
                viewBox="0 0 20 20"
                enableBackground="new 0 0 20 20"
                className="w-4 h-4 inline-block"
              >
                <path
                  fill="#FFFFFF"
                  d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
                />
              </svg>
              &nbsp;Añadir cartel
            </Link>
            {user && (
              <>
                <div className="flex items-center ml-3">
                  <div>
                    <button
                      type="button"
                      className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      aria-expanded="false"
                      data-dropdown-toggle="dropdown-user2"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        alt="user photo"
                      />
                    </button>
                  </div>

                  <div
                    className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user2"
                  >
                    <div className="px-4 py-3" role="none">
                      {/*<p*/}
                      {/*  className="text-sm text-gray-900 dark:text-white"*/}
                      {/*  role="none"*/}
                      {/*>*/}
                      {/*  Neil Sims*/}
                      {/*</p>*/}
                      <p
                        className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                      >
                        {user.email}
                      </p>
                    </div>
                    <ul className="py-1" role="none">
                      <li>
                        <Link
                          href={routes.profile}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Mis Datos
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={routes.userBoards}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Mis Carteles
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={routes.userSubscription}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Mi Suscripción
                        </Link>
                      </li>
                    </ul>
                    <ul className="py-1" role="none">
                      <li>
                        <Link
                          href="#"
                          onClick={handleLogOut}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Cerrar Sesión
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <button
                  data-collapse-toggle="mobile-menu-2"
                  type="button"
                  className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="mobile-menu-2"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    className="hidden w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {navRoutes.map((r) => (
                <li key={r.label}>
                  <Link
                    href={r.href}
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

function Layout(props: { children: JSX.Element }) {
  const [loggedUser, setLoggedUser] = useState<User | null>(null)

  return <main>
    <Header/>
    {/*<Header loggedUser={ loggedUser }/>*/}
    {/*<div className={ styles.center }>*/}
    {props.children}
    {/*</div>*/}
    <Footer/>
  </main>
}

export default Layout