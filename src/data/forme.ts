/**
 * Dictionnaire contenant les matrices pour chaque forme de Tetris.
 * * Légende des valeurs :
 * 1 : Cellules qui constituent la forme de la pièce elle-même.
 * 0 : Cellules directement voisines (bordure invisible / "I" de l'image).
 * -1 : Le reste des colonnes (zone vide).
 */
export const letters = [
  // Forme T
  "T",

  // Forme L
  "L",

  // Forme J
  "J",

  // Forme S
  "S",

  // Forme Z
  "Z",

  // Forme O (Carré)
  "O",

  // Forme I (Ligne)
  "I",
];
export const tetrisMatrices:number[][][] = [

  [
    [0, 1, 0],
    [1, 1, 1],
  ],


  [

    [ 0, 0, 1],
    [ 1, 1, 1],
   
  ],


  [
  
    [ 1, 0, 0 ],
    [ 1, 1, 1],
  
  ],

  [

  
    [ 0, 1, 1,],
    [ 1, 1, 0],
   
  ],


  [
 
    [ 1, 1, 0, ],
    [0, 1, 1, ],
  
  ],


  [
   
    [ 1, 1],
    [ 1, 1],
  
  ],


  [
    
   
      [0, 1, 1, 1, 1, 0],
   
  ],
];

const CASE_BORDER = 4;
export const GRID_CASE_WIDTH = 25 + CASE_BORDER;
