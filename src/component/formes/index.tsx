import { useEffect, useRef, useState } from "react";
import { GRID_CASE_WIDTH } from "../../data/forme";
import {
  bottomCollision,
  getPositionRightAndBottom,
  leftCollision,
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
    left: 10 * GRID_CASE_WIDTH,
  });
  const [collisionEcart, setColissionEcart] = useState(1);

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
      collisionEcart,
      setColissionEcart,
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.document.addEventListener("keydown", (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft") {
          
          const isLeftColision = leftCollision(
            position.top / GRID_CASE_WIDTH,
            matrix,
            tetrisMatrix.current,
            position.left / GRID_CASE_WIDTH,
            collisionEcart,
            setColissionEcart,
          );

          if (!isLeftColision) {
            setPosition((position) => {
              const { left, ...rest } = position;
              const newPosition = {
                left: Math.max(0, left - GRID_CASE_WIDTH),
                ...rest,
              };
              return newPosition;
            });
          }
        }

        // const isLeftColision = leftCollision(
        //   position.top / GRID_CASE_WIDTH,
        //   matrix,
        //   tetrisMatrix.current,
        //   position.left / GRID_CASE_WIDTH,
        //   collisionEcart,
        //   setColissionEcart,
        // );

        // if (!isLeftColision) {
        //   setPosition((position) => {
        //     const { left, ...rest } = position;
        //     const newPosition = {
        //       left:
        //         event.key === "ArrowLeft"
        //           ? Math.max(0, left - GRID_CASE_WIDTH)
        //           : Math.min(
        //               (tetrisMatrix.current[0].length - matrix[0].length) *
        //                 GRID_CASE_WIDTH,
        //               left + GRID_CASE_WIDTH,
        //             ),
        //       ...rest,
        //     };
        //     return newPosition;
        //   });
        // }
      });
    }
    return () => {
      // window.document.removeEventListener("keydown", rotate);
    };
  }, []);
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
