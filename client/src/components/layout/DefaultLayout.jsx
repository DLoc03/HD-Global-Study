import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <div className="mx-auto mt-28 max-w-[1440px] px-4 xl:px-0">
        {children}
      </div>
      <Footer />
    </>
  );
}

export default DefaultLayout;
