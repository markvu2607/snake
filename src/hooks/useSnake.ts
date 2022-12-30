import React, { useEffect, useState } from "react";
import { initSnakeMatrix, KeyboardCode } from "../constants";

function useSnake(): number[][] {
  const [snakeMatrix, setSnakeMatrix] = useState<number[][]>(initSnakeMatrix);

  const [direction, setDirection] = useState<"up" | "down" | "left" | "right">(
    "right"
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(direction);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [direction]);

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

  return snakeMatrix;
}

export default useSnake;
