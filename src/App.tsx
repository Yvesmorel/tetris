import "./App.css";
import Forme from "./component/formes";
import { tetrisMatrices } from "./data/forme";
import { rotateMatrix } from "./lib/utils";
import { useState, useEffect, useCallback } from "react";
function App() {
  const [currentForm, setCurrentForm] = useState(tetrisMatrices["I"]);

  const rotate = useCallback(
    (event: KeyboardEvent) => {
      if (event.ctrlKey) setCurrentForm((curr) => rotateMatrix(curr, "left"));
    },
    [currentForm],
  );

  useEffect(() => {
    if (typeof window !== "undefined")
      window.document.addEventListener("keydown", rotate);
    return () => {
      window.document.removeEventListener("keydown", rotate);
    };
  }, []);

  return (
    <div className="w-screen h-full">
      <Forme matrix={currentForm} name="I" />
    </div>
  );
}

export default App;
