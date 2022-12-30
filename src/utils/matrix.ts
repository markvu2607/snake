export const addTwoMatrices = (
  matrix1: Array<Array<number>>,
  matrix2: Array<Array<number>>
) => {
  const matrix1Clone = [...matrix1];
  for (let i = 0; i < matrix1.length; i++) {
    for (let j = 0; j < matrix1[i].length; j++) {
      matrix1Clone[i][j] += matrix2[i][j];
    }
  }
  return matrix1Clone;
};
