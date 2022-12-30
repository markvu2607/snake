import React, { useState, useEffect } from "react";

import SquarePoint from "../../components/SquarePoint";
import { useSnake } from "../../hooks";
import { cloneMatrix } from "../../utils";

import { baseScreenMatrix, ESpeeds } from "../../constants";
import { TCoordinate } from "../../types";
import "./App.css";

function App() {
  const { snakeCoordinates, getNextCoordinate, run, eat } = useSnake();
  const [screenMatrix, setScreenMatrix] = useState<Array<Array<number>>>([]);

  const renderSnake = (snakeCoordinates: TCoordinate[]) => {
    const baseScreen = cloneMatrix(baseScreenMatrix.BASIC);
    snakeCoordinates.forEach((coordinate: TCoordinate) => {
      baseScreen[coordinate.y][coordinate.x] = 1;
    });

    return baseScreen;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextCoordinate = getNextCoordinate();
      const isBody = snakeCoordinates.find(
        (coordinate: TCoordinate) =>
          JSON.stringify(coordinate) === JSON.stringify(nextCoordinate)
      );
      const isFood = false;
      const isRun = !isBody && !isFood;
      if (isRun) {
        run();
      }
    }, ESpeeds.EASY);

    return () => {
      clearInterval(intervalId);
    };
  }, [run, getNextCoordinate, snakeCoordinates]);

  //change screen when snake move
  useEffect(() => {
    const matrixRenderSnake = renderSnake(snakeCoordinates);
    setScreenMatrix(matrixRenderSnake);
  }, [snakeCoordinates]);

  return (
    <div className="App">
      {screenMatrix.map((row: Array<number>, index: number) => {
        return (
          <div className="App__row" key={index}>
            {row.map((point: number, index: number) => (
              <SquarePoint
                key={index}
                color={point === 1 ? "black" : "white"}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default App;
