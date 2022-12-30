import { useEffect, useState } from "react";
import { initSnakeCoordinates, KeyboardCode } from "../constants";
import { TCoordinate } from "../types";

function useSnake(): {
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

  const eat = (): void => {};

  const getNextCoordinate = (): TCoordinate => {
    const headOfSnake: TCoordinate =
      snakeCoordinates[snakeCoordinates.length - 1];
    switch (direction) {
      case "up":
        return { ...headOfSnake, y: headOfSnake.y - 1 };
      case "down":
        return { ...headOfSnake, y: headOfSnake.y + 1 };
      case "left":
        return { ...headOfSnake, x: headOfSnake.x - 1 };
      case "right":
        return { ...headOfSnake, x: headOfSnake.x + 1 };
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
