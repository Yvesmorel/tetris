import { GRID_CASE_WIDTH } from "../data/forme";

export function rotateMatrix(matrix: number[][], sens: "left" | "rigth") {
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
  }

  return matrixRotated;
}

export const getInitialBoard = (rows: number, cols: number) =>
  Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => (i > 20 && j > 10 ? 1 : 0)),
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
) => {
  const posistionTop = position.top / GRID_CASE_WIDTH;
  const positionLeft = position.left / GRID_CASE_WIDTH;

  for (let i = posistionTop; i < posistionTop + matrix.length; i++) {
    for (let j = positionLeft; j < positionLeft + matrix[0].length; j++) {
      if (tetrisMatrix.current[i][j] === 0)
        tetrisMatrix.current[i][j] = matrix[i - posistionTop][j - positionLeft];
    }
  }
  forceTetrisRender((forceRender) => forceRender + 1);
};

export const bottomCollision = (
  posistionTop: number,
  matrix: number[][],
  tetrisMatrix: number[][],
  positionLeft: number,
  ecart: number,
  setColissionEcart: React.Dispatch<React.SetStateAction<number>>,
) => {
  for (
    let i = posistionTop + matrix.length;
    i < Math.min(posistionTop + matrix.length + ecart, tetrisMatrix.length);
    i++
  ) {
    for (let j = positionLeft; j < positionLeft + matrix[0].length; j++) {
      if (tetrisMatrix[i][j] === 1) {
        setColissionEcart((ecart) => ecart + 1);
        if (
          matrix[Math.max(0, i - posistionTop - ecart)][j - positionLeft] === 1
        )
          return true;
      }
    }
  }
  return false;
};

export const leftCollision = (
  posistionTop: number,
  matrix: number[][],
  tetrisMatrix: number[][],
  positionLeft: number,
  ecart: number,
) => {


  for (let row = posistionTop; row < posistionTop + matrix.length; row++) {
    for (
      let column = positionLeft;
      column >= Math.max(positionLeft - ecart, 0);
      column--
    ) {
      if (row >= 0) {

        if (tetrisMatrix[row][column] === 1) {
          // setColissionEcart((ecart) => ecart + 1);
          console.log(column, positionLeft, ecart);
          if (
            matrix[row - posistionTop][Math.min(matrix[0].length - 1, column - positionLeft + ecart)] === 1
          ) {
            return true;
          }

        }
      }
    }
  }
  return false;
};

export const leftCollisionRisk = (
  posistionTop: number,
  matrix: number[][],
  tetrisMatrix: number[][],
  positionLeft: number,

) => {


  for (let row = posistionTop; row < posistionTop + matrix.length; row++) {
    for (
      let column = positionLeft;
      column >= Math.max(positionLeft - 1, 0);
      column--
    ) {
      if (row >= 0) {

        if (tetrisMatrix[row][column] === 1) return true
      }
    }
  }
  return false;
};


export const rigthCollision = (
  posistionTop: number,
  matrix: number[][],
  tetrisMatrix: number[][],
  positionLeft: number,
  ecart: number,
) => {

  for (let row = posistionTop; row < posistionTop + matrix.length; row++) {
    for (
      let column = positionLeft + matrix[0].length;
      column < Math.min(positionLeft + matrix[0].length + ecart, tetrisMatrix[0].length);
      column++
    ) {
      if (row >= 0) {
        if (tetrisMatrix[row][column] === 1) {

          if (
            matrix[row - posistionTop][Math.max(0, column - positionLeft - ecart)] === 1
          )
            return true;
        }
      }

    }
  }

  return false;
};
export const rigthCollisionRisk = (
  posistionTop: number,
  matrix: number[][],
  tetrisMatrix: number[][],
  positionLeft: number,
) => {

  for (let row = posistionTop; row < posistionTop + matrix.length; row++) {
    for (
      let column = positionLeft + matrix[0].length;
      column < Math.min(positionLeft + matrix[0].length + 1, tetrisMatrix[0].length);
      column++
    ) {
      if (row >= 0) {
        if (tetrisMatrix[row][column] === 1) return true
      }

    }
  }

  return false;
};;

// export const leftCollision = (
//   posistionTop: number,
//   matrix: number[][],
//   tetrisMatrix: number[][],
//   positionLeft: number,
// ) => {
//   // for (let i = posistionTop; i < posistionTop + matrix.length; i++) {

//   //     tetrisMatrix[i][Math.max(0,positionLeft-1)] = matrix[i - posistionTop][positionLeft];

//   // }

//   return false;
// };
