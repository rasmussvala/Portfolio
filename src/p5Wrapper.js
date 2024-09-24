import React, { useRef, useEffect, useState } from "react";
import p5 from "p5";
import sketch from "./p5Sketch"; // Adjust the path if necessary

const P5Wrapper = () => {
  const canvasRef = useRef(null);
  const [theme, setTheme] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    let canvas = new p5(sketch, canvasRef.current);

    return () => {
      canvas.remove(); // Clean up the p5 instance on component unmount or theme change
    };
  }, [theme]); // Add theme as a dependency to rerender when theme changes

  // Detect system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return <div ref={canvasRef} className="p5-canvas" />;
};

export default P5Wrapper;
