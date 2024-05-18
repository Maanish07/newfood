import React, { useEffect } from "react";
import Header from "../components/Header";
import { Footer } from "../components/Footer";

import { Menuitem } from "../components/Menuitem";
import { CartProvider } from "../context/Cart";

function Home() {
  return (
    <>
      <CartProvider>
        <div>
          <Header />
        </div>
        <Menuitem />
        <div>
          <Footer />
        </div>
      </CartProvider>
    </>
  );
}

export default Home;