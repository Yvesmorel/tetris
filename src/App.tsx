import "./App.css";
import Forme from "./component/formes";
import Board from "./component/tetris_board";
import { tetrisMatrices } from "./data/forme";
import { rotateMatrix } from "./lib/utils";
import { useState, useEffect, useCallback } from "react";
function App() {


  return (
    <div className="w-screen h-full app">
      {/* <Forme matrix={currentForm} name="I" /> */}
       <Board rows={30} cols={20}/>
    </div>
  );
}

export default App;
