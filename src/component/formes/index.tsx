import { useEffect, useRef, useState } from "react";
import { GRID_CASE_WIDTH } from "../../data/forme";
import {
  bottomCollision,
  getPositionRightAndBottom,
  setPointOnTetris,
} from "../../lib/utils";

function Forme({
  name,
  matrix,
  tetrisMatrix,
  forceTetrisRender,
}: {
  name: string;
  matrix: number[][];
  tetrisMatrix: React.RefObject<number[][]>;
  forceTetrisRender: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [position, setPosition] = useState({
    top: -matrix.length * GRID_CASE_WIDTH,
    left: 0,
  });

  const interval = useRef<number>(undefined);

  useEffect(() => {
    const positionBottom = getPositionRightAndBottom(
      "bottom",
      tetrisMatrix.current,
      matrix,
      position,
    );

    const positionRigth = getPositionRightAndBottom(
      "rigth",
      tetrisMatrix.current,
      matrix,
      position,
    );
    
    const isBottomColision = bottomCollision(
      position.top / GRID_CASE_WIDTH,
      matrix,
      tetrisMatrix.current,
      position.left / GRID_CASE_WIDTH,
    );

    if (positionBottom === 0 || isBottomColision) {
      setPointOnTetris(matrix, position, tetrisMatrix, forceTetrisRender);
      clearInterval(interval.current);
    } else {
      interval.current = setInterval(
        () =>
          setPosition((position) => {
            const { top, ...rest } = position;
            const newPosition = { top: top + GRID_CASE_WIDTH, ...rest };
            return newPosition;
          }),
        500,
      );
    }

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [position, matrix]);

  return (
    <div
      className={`tetromino-grid ${name}`}
      style={{
        width: `${matrix[0].length * GRID_CASE_WIDTH}px`,
        gridTemplateColumns: `repeat(${matrix[0].length},1fr)`,
        gridTemplateRows: `repeat(${matrix.length}, 1fr)`,
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {matrix.map((row) => {
        return row.map((cell, i) =>
          cell === 1 ? (
            <div className="cell visible" key={i}></div>
          ) : cell === 0 ? (
            <div className="cell invisible text-black gate" key={i}>
              i
            </div>
          ) : (
            <div className="cell invisible " key={i}></div>
          ),
        );
      })}
    </div>
  );
}

export default Forme;
