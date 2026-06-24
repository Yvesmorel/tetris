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

  return matrixRotated
}


export function rotate(event:KeyboardEvent) {

        if (event.ctrlKey) {
          event.preventDefault(); // Empêche le comportement par défaut du navigateur (ex: enregistrer la page)
          console.log("Raccourci Ctrl activé !");
        }
 
}