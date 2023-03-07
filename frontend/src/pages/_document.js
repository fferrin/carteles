'use client';
import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html className="dark">
      <Head>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.min.css" rel="stylesheet"/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.min.js" async/>
      </Head>
      {/*<Script*/}
      {/*  src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.3/flowbite.min.js"*/}
      {/*  strategy="lazyOnload"*/}
      {/*  onLoad={() =>*/}
      {/*    alert(`script loaded correctly, window.FB has been populated`)*/}
      {/*  }*/}
      {/*/>*/}
      <body>
      <Main/>
      <NextScript/>
      </body>
    </Html>
  )
}