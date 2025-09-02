import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function DefaultLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-full bg-gray-100">
      {isMobile ? (
        <>
          <div
            className={`fixed top-0 left-0 z-50 h-full w-64 transform bg-white shadow-lg transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <Sidebar />
          </div>

          {isOpen && (
            <div
              className="bg-opacity-40 fixed inset-0 z-40 bg-black/20"
              onClick={() => setIsOpen(false)}
            ></div>
          )}
        </>
      ) : (
        <div
          className={`transition-all duration-300 ${
            isOpen ? "w-64" : "w-0"
          } overflow-hidden bg-white shadow-lg`}
        >
          <Sidebar />
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col transition-all duration-300">
        <Header
          onToggle={() => setIsOpen((prev) => !prev)}
          showToggle={isMobile}
        />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

export default DefaultLayout;
