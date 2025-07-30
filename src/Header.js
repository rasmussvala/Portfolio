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
            Hi, I'm Rasmus, a software engineer with an M.Sc. in Media Technology and Engineering, based in Linköping, Sweden.
          </p>
        </div>
      </header>
    </>
  );
}
