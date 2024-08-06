import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import { Menuitem } from "../components/Menuitem";
import { CartProvider } from "../context/Cart";
import { Carousels } from "../components/Carousels";
import Swipe from "../components/Swipe";
import Testimonial from "../components/Testimonial";

function Home() {
  return (
    <>
      <CartProvider>
        <div>
          <Header />
        </div>
        <Carousels />
        <Menuitem />
        <Swipe />
        <Testimonial />
        <div>
          <Footer />
        </div>
      </CartProvider>
    </>
  );
}

export default Home;
