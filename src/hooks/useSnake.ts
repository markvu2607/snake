import React, { useEffect, useState } from "react";
import { initSnakeMatrix } from "../constants";

function useSnake(): [
  number[][],
  React.Dispatch<React.SetStateAction<number[][]>>
] {
  const [snakeMatrix, setSnakeMatrix] = useState<number[][]>(initSnakeMatrix);

  const [direction, setDirection] = useState<"up" | "down" | "left" | "right">(
    "right"
  );

  return [snakeMatrix, setSnakeMatrix];
}

export default useSnake;
