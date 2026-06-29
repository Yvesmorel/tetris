import { useCallback, useEffect, useRef, useState } from "react";
import {
  getInitialBoard,
  getRandomIntInclusive,
  rotateMatrix,
} from "../../lib/utils";
import { GRID_CASE_WIDTH, letters, tetrisMatrices } from "../../data/forme";
import Forme from "../formes";

function Board({ rows, cols }: { rows: number; cols: number }) {
  const tetrisMatrix = useRef(getInitialBoard(rows, cols));
  const [selectForm, setSelectForm] = useState(
    getRandomIntInclusive(0, letters.length - 1),
  );
  const [currentForm, setCurrentForm] = useState(tetrisMatrices[selectForm]);
  const [_, forceTetrisRender] = useState(0);

  useEffect(()=> {setCurrentForm(tetrisMatrices[selectForm])},[selectForm])
 

  return (
    <div
      className="
       tetris-board"
      style={{
        width: `${tetrisMatrix.current[0].length * GRID_CASE_WIDTH}px`,
        gridTemplateColumns: `repeat(${tetrisMatrix.current[0].length},1fr)`,
        gridTemplateRows: `repeat(${tetrisMatrix.current.length}, 1fr)`,
      }}
    >
      <Forme
        matrix={currentForm}
        setMatrix={setCurrentForm}
        name={`${letters[selectForm]}`}
        tetrisMatrix={tetrisMatrix}
        forceTetrisRender={forceTetrisRender}
        setSelectForm={setSelectForm}
      />
      {tetrisMatrix.current.map((row, i) => {
        return row.map((cell, j) =>
          cell === 1 ? (
            <div
              id={`${i}-${j}`}
              key={j}
              className="cell visible 1"
              style={{ backgroundColor: "black" }}
            ></div>
          ) : (
            <div id={`${i}-${j}`} key={j} className="cell visible"></div>
          ),
        );
      })}
    </div>
  );
}

export default Board;
