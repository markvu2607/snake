import { useEffect, useState } from "react";
import { initSnakeCoordinates, KeyboardCode } from "../constants";
import { TCoordinate } from "../types";

function useSnake(matrix: number[][]): {
  snakeCoordinates: TCoordinate[];
  getNextCoordinate: () => TCoordinate;
  run: () => void;
  eat: () => void;
} {
  const [snakeCoordinates, setSnakeCoordinates] =
    useState<TCoordinate[]>(initSnakeCoordinates);

  const [direction, setDirection] = useState<"up" | "down" | "left" | "right">(
    "right"
  );

  const run = (): void => {
    setSnakeCoordinates((preState) => {
      const newState = preState.slice(1);
      return [...newState, getNextCoordinate()];
    });
  };

  const eat = (): void => {
    setSnakeCoordinates((preState) => {
      return [...preState, getNextCoordinate()];
    });
  };

  const getNextCoordinate = (): TCoordinate => {
    const headOfSnake: TCoordinate =
      snakeCoordinates[snakeCoordinates.length - 1];
    switch (direction) {
      case "up":
        return headOfSnake.y - 1 < 0
          ? { ...headOfSnake, y: matrix.length - 1 }
          : { ...headOfSnake, y: headOfSnake.y - 1 };
      case "down":
        return headOfSnake.y + 1 >= matrix.length
          ? { ...headOfSnake, y: 0 }
          : { ...headOfSnake, y: headOfSnake.y + 1 };
      case "left":
        return headOfSnake.x - 1 < 0
          ? { ...headOfSnake, x: matrix[0].length - 1 }
          : { ...headOfSnake, x: headOfSnake.x - 1 };
      case "right":
        return headOfSnake.x + 1 >= matrix[0].length
          ? { ...headOfSnake, x: 0 }
          : { ...headOfSnake, x: headOfSnake.x + 1 };
    }
  };

  // add event listener control snake
  useEffect(() => {
    const handleChangeDirection = ({ code: keyCode }: KeyboardEvent) => {
      switch (keyCode) {
        case KeyboardCode.ARROW_UP:
          setDirection((prevState) => {
            if (prevState === "up" || prevState === "down") return prevState;
            return "up";
          });
          break;
        case KeyboardCode.ARROW_DOWN:
          setDirection((prevState) => {
            if (prevState === "up" || prevState === "down") return prevState;
            return "down";
          });
          break;
        case KeyboardCode.ARROW_LEFT:
          setDirection((prevState) => {
            if (prevState === "left" || prevState === "right") return prevState;
            return "left";
          });
          break;
        case KeyboardCode.ARROW_RIGHT:
          setDirection((prevState) => {
            if (prevState === "left" || prevState === "right") return prevState;
            return "right";
          });
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleChangeDirection);

    return () => {
      document.removeEventListener("keydown", handleChangeDirection);
    };
  }, []);

  return { snakeCoordinates, getNextCoordinate, run, eat };
}

export default useSnake;
