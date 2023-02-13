import '../styles/globals.css'

import { Provider} from 'react-redux'
import type { AppProps } from 'next/app'

import store from '../state/store'
import { appWithTranslation } from "next-i18next";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default appWithTranslation(MyApp)