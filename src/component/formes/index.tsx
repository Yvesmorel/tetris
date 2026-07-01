import { useCallback, useEffect, useRef, useState } from "react";
import { GRID_CASE_WIDTH, letters } from "../../data/forme";
import { useSound } from 'react-sounds';
import {
  getPositionRightAndBottom,
  getRandomIntInclusive,
  isCollison,
  move,
  rotateMatrix,
  setPointOnTetris,
} from "../../lib/utils";

function Forme({
  name,
  matrix,
  tetrisMatrix,
  forceTetrisRender,
  setMatrix,
  setSelectForm,
  tetrisPoint,
}: {
  name: string;
  matrix: number[][];
  tetrisMatrix: React.RefObject<number[][]>;
  forceTetrisRender: React.Dispatch<React.SetStateAction<number>>;
  setMatrix: React.Dispatch<React.SetStateAction<number[][]>>;
  setSelectForm: React.Dispatch<React.SetStateAction<number>>;
  tetrisPoint: React.RefObject<Record<string, any>>;
}) {
  const [position, setPosition] = useState({
    top: -matrix.length * GRID_CASE_WIDTH,
    left: 5 * GRID_CASE_WIDTH,
  });
  const { play: playMissedSound } = useSound('game/miss');
  const { play: playCoinSound } = useSound('arcade/coin');
  const { play: playDropSound } = useSound('ui/success_blip');
  const interval = useRef<number>(undefined);
  const timeOut = useRef<number>(undefined);
  const moveLeftWithKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {


        move(
          {
            top: position.top,
            left: Math.max(0, position.left - GRID_CASE_WIDTH),
          },
          matrix,
          tetrisMatrix,
          setPosition,
        );
      }
    },
    [matrix, position],
  );

  const moveRightWithKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        playMissedSound()
        move(
          {
            top: position.top,
            left: Math.min(
              (tetrisMatrix.current[0].length - matrix[0].length) *
              GRID_CASE_WIDTH,
              position.left + GRID_CASE_WIDTH,
            ),
          },
          matrix,
          tetrisMatrix,
          setPosition,
        );
      }
    },
    [matrix, position],
  );

  const moveBottomWithKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        playMissedSound()
        move(
          {
            top: position.top + GRID_CASE_WIDTH,
            left: position.left,
          },
          matrix,
          tetrisMatrix,
          setPosition,
        );
      }
    },
    [matrix, position],
  );
  const rotate = useCallback(
    (event: KeyboardEvent) => {
      playMissedSound()

      if (event.ctrlKey)
        setMatrix((curr) => rotateMatrix(curr, "left", position, tetrisMatrix));
    },
    [matrix, position],
  );

  useEffect(() => {

    if (tetrisPoint.current[`win`]) {
      playCoinSound()
      tetrisPoint.current[`win`] = false;
      forceTetrisRender((forceRender) => forceRender + 1);
    }
    if (typeof window !== "undefined") {
      window.document.addEventListener("keydown", moveLeftWithKey);
      window.document.addEventListener("keydown", moveRightWithKey);
      window.document.addEventListener("keydown", moveBottomWithKey);
      window.document.addEventListener("keydown", rotate);
    }

    const positionBottom = getPositionRightAndBottom(
      "bottom",
      tetrisMatrix.current,
      matrix,
      position,
    );

    const newPosition = {
      top: position.top + GRID_CASE_WIDTH,
      left: position.left,
    };
    const isBottomColision = isCollison(matrix, newPosition, tetrisMatrix);

    if (positionBottom === 0 || isBottomColision) {
      window.document.removeEventListener("keydown", moveBottomWithKey);
      playDropSound()

      timeOut.current = setTimeout(() => {
        setPointOnTetris(
          matrix,
          position,
          tetrisMatrix,
          forceTetrisRender,
          tetrisPoint,
          25,
        );
        setSelectForm(getRandomIntInclusive(0, letters.length - 1));
        setPosition({
          top: (-matrix.length - 1) * GRID_CASE_WIDTH,
          left: 5 * GRID_CASE_WIDTH,
        });

        clearInterval(interval.current);
        window.document.removeEventListener("keydown", rotate);
        window.document.removeEventListener("keydown", moveLeftWithKey);
        window.document.removeEventListener("keydown", moveRightWithKey);

      }, 500)

    } else {
      interval.current = setInterval(() => setPosition(newPosition), 300);
    }

    return () => {
      window.document.removeEventListener("keydown", rotate);
      window.document.removeEventListener("keydown", moveLeftWithKey);
      window.document.removeEventListener("keydown", moveRightWithKey);
      window.document.removeEventListener("keydown", moveBottomWithKey);
      if (interval.current) clearInterval(interval.current);
      if (timeOut.current) clearTimeout(timeOut.current);
    };
  }, [position, matrix]);

  useEffect(() => { }, [position, matrix]);

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
