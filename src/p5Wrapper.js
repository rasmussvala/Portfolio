import { useRef, useEffect, useState } from "react";
import p5 from "p5";
import sketch from "./p5Sketch";

const P5Wrapper = () => {
  const canvasRef = useRef(null);
  const [theme, setTheme] = useState("light"); // or "dark"

  // Remove and redo canvas to apply theme changes
  useEffect(() => {
    let canvas = new p5(sketch, canvasRef.current);
    // Cleanup function to remove canvas when effect runs again
    return () => { canvas.remove(); };
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery.matches ? "dark" : "light");

    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    // Cleanup function to remove event listener
    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return <div ref={canvasRef} className="p5-canvas" />;
};

export default P5Wrapper;
