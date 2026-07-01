import { GRID_CASE_WIDTH } from "../data/forme";

export function rotateMatrix(
  matrix: number[][],
  sens: "left" | "rigth",
  position: {
    top: number;
    left: number;
  },
  tetrisMatrix: React.RefObject<number[][]>,
) {
  const collision = isCollison(matrix, position, tetrisMatrix);

  if (collision) return matrix;

  const matrixRotated = [];

  if (sens === "rigth") {
    for (let i = 0; i < matrix[0].length; i++) {
      const row = [];
      for (let j = 0; j < matrix.length; j++) row.push(matrix[j][i]);
      matrixRotated.push(row);
    }
  } else {
    for (let i = 0; i < matrix[0].length; i++) {
      const row = [];
      for (let j = matrix.length - 1; j >= 0; j--) row.push(matrix[j][i]);
      matrixRotated.push(row);
    }
    if (
      position.top / GRID_CASE_WIDTH + matrixRotated.length >
      tetrisMatrix.current.length - 1
    ) {
      // newPosition.top = position.top / GRID_CASE_WIDTH - matrixRotated.length;
      return matrix;
    }

    if (
      position.left / GRID_CASE_WIDTH + matrixRotated[0].length >
      tetrisMatrix.current[0].length - 1
    ) {
      // newPosition.left =
      //   position.left / GRID_CASE_WIDTH - matrixRotated[0].length;
      return matrix;
    }
  }

  return matrixRotated;
}

export const getInitialBoard = (rows: number, cols: number) =>
  Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => 0),
  );

export function verifierCollision(element1: any, element2: any) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();

  return !(
    rect1.top > rect2.bottom ||
    rect1.bottom < rect2.top ||
    rect1.left > rect2.right ||
    rect1.right < rect2.left
  );
}

export const getPositionRightAndBottom = (
  direction: "bottom" | "rigth",
  tetrisMatrix: number[][],
  matrix: number[][],
  position: {
    top: number;
    left: number;
  },
) => {
  if (direction === "bottom") {
    const positionBottom =
      tetrisMatrix.length - (position.top / GRID_CASE_WIDTH + matrix.length);
    return positionBottom;
  } else {
    const positionRigth =
      tetrisMatrix[0].length -
      (position.left / GRID_CASE_WIDTH + matrix[0].length);
    return positionRigth;
  }
};

export const setPointOnTetris = (
  matrix: number[][],
  position: {
    top: number;
    left: number;
  },
  tetrisMatrix: React.RefObject<number[][]>,
  forceTetrisRender: React.Dispatch<React.SetStateAction<number>>,
  tetrisPoint: React.RefObject<Record<string, any>>,
  tetrisCol: number,
) => {
  if (position.top < 0 || position.left < 0) {
    return;
  }
  const posistionTop = position.top / GRID_CASE_WIDTH;
  const positionLeft = position.left / GRID_CASE_WIDTH;
  const deleteList: number[] = [];
  for (let i = posistionTop; i < posistionTop + matrix.length; i++) {
    for (let j = positionLeft; j < positionLeft + matrix[0].length; j++) {
      if (tetrisMatrix.current[i][j] === 0) {
        tetrisMatrix.current[i][j] = matrix[i - posistionTop][j - positionLeft];
        if (matrix[i - posistionTop][j - positionLeft] === 1) {
          if (tetrisPoint.current[`${i}`]) {
            tetrisPoint.current[`${i}`] = tetrisPoint.current[`${i}`] + 1;

            if (tetrisPoint.current[`${i}`] === tetrisCol) {
              tetrisPoint.current[`sum`] = tetrisPoint.current[`sum`] + 1;
              tetrisPoint.current[`win`] = true;
              deleteList.push(i);
              if (i > 0) {
                for (let pos = i; pos >= 1; pos--) {
                  if (tetrisPoint.current[`${pos}`]) {
                    tetrisPoint.current[`${pos}`] =
                      tetrisPoint.current[`${pos - 1}`];
                  }
                }
              }
            }
          } else tetrisPoint.current[`${i}`] = 1;
        }
      }
    }
  }
  if (deleteList.length > 0) {
    const newArray = Array.from({ length: tetrisCol }, (_, j) => 0);
    for (const line of deleteList) {
      tetrisMatrix.current.splice(line, 1);
      tetrisMatrix.current.unshift(newArray);
    }
  }
  forceTetrisRender((forceRender) => forceRender + 1);
};

export const isCollison = (
  matrix: number[][],
  position: {
    top: number;
    left: number;
  },
  tetrisMatrix: React.RefObject<number[][]>,
) => {
  const posistionTop = position.top / GRID_CASE_WIDTH;
  const positionLeft = position.left / GRID_CASE_WIDTH;

  for (
    let i = Math.min(
      tetrisMatrix.current.length - 1,
      posistionTop + matrix.length - 1,
    );
    i >= Math.max(0, posistionTop);
    i--
  )
    for (let j = positionLeft; j < positionLeft + matrix[0].length; j++) {
      if (
        tetrisMatrix.current[i][j] === 1 &&
        matrix[i - posistionTop][j - positionLeft] === 1
      )
        return true;
    }

  return false;
};









export const move = (
  position: {
    top: number;
    left: number;
  },
  matrix: number[][],
  tetrisMatrix: React.RefObject<number[][]>,
  setPosition: React.Dispatch<
    React.SetStateAction<{
      top: number;
      left: number;
    }>
  >,
) => {
  const collision = isCollison(matrix, position, tetrisMatrix);
  if (!collision) {
    setPosition(position);
  }
};
export function getRandomIntInclusive(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
