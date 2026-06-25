import { useCallback, useEffect, useRef, useState } from "react";
import { getInitialBoard, rotateMatrix } from "../../lib/utils";
import { GRID_CASE_WIDTH, tetrisMatrices } from "../../data/forme";
import Forme from "../formes";

function Board({ rows, cols }: { rows: number; cols: number }) {
  const tetrisMatrix = useRef(getInitialBoard(rows, cols));
  const [currentForm, setCurrentForm] = useState(tetrisMatrices["T"]);
  const [_, forceTetrisRender] = useState(0);

  const rotate = useCallback(
    (event: KeyboardEvent) => {
      if (event.ctrlKey) setCurrentForm((curr) => rotateMatrix(curr, "left"));
    },
    [currentForm],
  );

  useEffect(() => {
    console.log(3);

    if (typeof window !== "undefined")
      window.document.addEventListener("keydown", rotate);
    return () => {
      window.document.removeEventListener("keydown", rotate);
    };
  }, []);

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
        name="T"
        tetrisMatrix={tetrisMatrix}
        forceTetrisRender={forceTetrisRender}
      />
      {tetrisMatrix.current.map((row, i) => {
        return row.map((cell, j) =>
          cell === 1 ? (
            <div
              id={`${i}-${j}`}
              key={j}
              className="cell visible 1"
              style={{ backgroundColor: "blue" }}
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
