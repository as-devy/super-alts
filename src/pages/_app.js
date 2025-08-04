import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../styles/style.css';
import '../styles/layout/header.css';
import '../styles/layout/footer.css';
import '../styles/home.css';
import '../styles/products.css';
import '../styles/dashboard.css';
import '../styles/responsive.css';

import { SessionProvider } from "next-auth/react";
import AuthWrapper from './components/AuthWrapper';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js').then((module) => {
      window.bootstrap = module;
    });
  }, []);

  return (
    <SessionProvider session={session}>
      <AuthWrapper>
        <Component {...pageProps} session={session} cart={cart} setCart={setCart} />
      </AuthWrapper>
    </SessionProvider>
  );
}
