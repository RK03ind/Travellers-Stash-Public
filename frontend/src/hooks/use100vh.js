import { useState } from "react";

const use100vh = () => {
  const [height, setHeight] = useState(window.innerHeight);
  window.addEventListener("resize", () => {
    setHeight(window.innerHeight);
  });

  return isRendered() ? `${height.toString()}px` : null;
};

const isRendered = () => {
  return typeof window !== "undefined" && typeof document !== "undefined";
};
export default use100vh;
