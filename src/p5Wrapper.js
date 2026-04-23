import { useRef, useEffect, useState } from "react";
import p5 from "p5";
import sketch from "./p5Sketch";

const SMALL_MQ = "(max-width: 899px)";

const P5Wrapper = () => {
  const canvasRef = useRef(null);
  const [theme, setTheme] = useState("light");
  const [isSmall, setIsSmall] = useState(
    () =>
      typeof window !== "undefined" && window.matchMedia(SMALL_MQ).matches
  );

  useEffect(() => {
    const canvas = new p5(sketch, canvasRef.current);
    return () => {
      canvas.remove();
    };
  }, [theme, isSmall]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(mediaQuery.matches ? "dark" : "light");
    const handleThemeChange = (e) => setTheme(e.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleThemeChange);
    return () => mediaQuery.removeEventListener("change", handleThemeChange);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(SMALL_MQ);
    const handler = (e) => setIsSmall(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return <div ref={canvasRef} className="p5-canvas" />;
};

export default P5Wrapper;
