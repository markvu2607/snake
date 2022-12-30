export const cloneMatrix = (matrix: number[][]) => {
  const clone: number[][] = [];
  for (let i = 0; i < matrix.length; i++) {
    let rowClone = [];
    for (let j = 0; j < matrix[i].length; j++) {
      rowClone.push(matrix[i][j]);
    }
    clone.push(rowClone);
  }

  return clone;
};
