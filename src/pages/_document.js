import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" dir="rtl">
      <Head>
        {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        /> */}
        <link rel="shortcut icon" href="/assets/favicons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="144x144" href="/assets/favicons/favicon-144.png" />
        <link rel="apple-touch-icon" sizes="168x168" href="/assets/favicons/favicon-168.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/assets/favicons/favicon-192.png" />
        <link rel="apple-touch-icon" sizes="256x256" href="/assets/favicons/favicon-256.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/assets/favicons/favicon-512.png" />
        {/* <title>Super Alts</title> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
