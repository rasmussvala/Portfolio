// src/components/P5Wrapper.js
import React, { useRef, useEffect } from "react";
import p5 from "p5";
import sketch from "./p5Sketch"; // Adjust the path if necessary

const P5Wrapper = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new p5(sketch, canvasRef.current);

    return () => {
      canvas.remove(); // Clean up the p5 instance on component unmount
    };
  }, []);

  return <div ref={canvasRef} className="p5-canvas" />;
};

export default P5Wrapper;
