// src/components/Header.js
import React from "react";
import P5Wrapper from "./p5Wrapper";

export default function Header() {
  return (
    <>
      <header className="header">
        <div className="text-container">
          <P5Wrapper />
          <p>
            Hi, my name is Rasmus and I'm a final-year MSc student in Media
            Technology and Engineering, based in Norrköping, Sweden.
          </p>
        </div>
      </header>
    </>
  );
}
