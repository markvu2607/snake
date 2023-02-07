import React, { useState, useEffect } from "react";

import SquarePoint from "../../components/SquarePoint";
import { useSnake } from "../../hooks";
import { cloneMatrix, randomUnder } from "../../utils";

import { baseScreenMatrix, EPointValues, ESpeeds } from "../../constants";
import { TCoordinate } from "../../types";
import "./App.css";

function App() {
  const { snakeCoordinates, getNextCoordinate, run, eat, reset } = useSnake(
    cloneMatrix(baseScreenMatrix.BASIC)
  );
  const [foodCoordinate, setFoodCoordinate] = useState<TCoordinate>(() => {
    while (true) {
      const randomCoordinate = {
        x: randomUnder(baseScreenMatrix.BASIC[0].length - 1),
        y: randomUnder(baseScreenMatrix.BASIC.length - 1),
      };

      const isFindInsideSnake = snakeCoordinates.find(
        (coordinate: TCoordinate) =>
          JSON.stringify(coordinate) === JSON.stringify(randomCoordinate)
      );

      if (!isFindInsideSnake) return randomCoordinate;
    }
  });
  const [screenMatrix, setScreenMatrix] = useState<number[][]>([]);

  const getColorOfPoint = (point: number) => {
    switch (point) {
      case EPointValues.BODY:
        return "black";
      case EPointValues.HEAD:
        return "red";
      case EPointValues.FOOD:
        return "green";
      default:
        return "white";
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextCoordinate = getNextCoordinate();
      const isBody = snakeCoordinates
        .slice(1, snakeCoordinates.length)
        .find(
          (coordinate: TCoordinate) =>
            JSON.stringify(coordinate) === JSON.stringify(nextCoordinate)
        );
      const isFood =
        JSON.stringify(foodCoordinate) === JSON.stringify(nextCoordinate);
      const isRun = !isBody && !isFood;
      if (isRun) {
        run();
      } else if (isFood) {
        eat();
        setFoodCoordinate((prevState) => {
          while (true) {
            const randomCoordinate = {
              x: randomUnder(baseScreenMatrix.BASIC[0].length - 1),
              y: randomUnder(baseScreenMatrix.BASIC.length - 1),
            };

            const isFindInsideSnake = snakeCoordinates.find(
              (coordinate: TCoordinate) =>
                JSON.stringify(coordinate) === JSON.stringify(randomCoordinate)
            );

            if (
              !isFindInsideSnake &&
              JSON.stringify(prevState) !== JSON.stringify(randomCoordinate)
            )
              return randomCoordinate;
          }
        });
      } else if (isBody) {
        alert("You dead!");
        clearInterval(intervalId);

        //reset snake
        reset();

        //reset food
        setFoodCoordinate((prevState) => {
          while (true) {
            const randomCoordinate = {
              x: randomUnder(baseScreenMatrix.BASIC[0].length - 1),
              y: randomUnder(baseScreenMatrix.BASIC.length - 1),
            };

            const isFindInsideSnake = snakeCoordinates.find(
              (coordinate: TCoordinate) =>
                JSON.stringify(coordinate) === JSON.stringify(randomCoordinate)
            );

            if (
              !isFindInsideSnake &&
              JSON.stringify(prevState) !== JSON.stringify(randomCoordinate)
            )
              return randomCoordinate;
          }
        });
      }
    }, ESpeeds.HARD);

    return () => {
      clearInterval(intervalId);
    };
  }, [run, getNextCoordinate, eat, foodCoordinate, snakeCoordinates, reset]);

  //change screen when snake move
  useEffect(() => {
    const renderScreen = (snakeCoordinates: TCoordinate[]) => {
      const baseScreen = cloneMatrix(baseScreenMatrix.BASIC);

      // Render snake
      snakeCoordinates.forEach((coordinate: TCoordinate, index: number) => {
        if (index !== snakeCoordinates.length - 1) {
          baseScreen[coordinate.y][coordinate.x] = 1;
        } else {
          baseScreen[coordinate.y][coordinate.x] = 2;
        }
      });

      // Render food
      baseScreen[foodCoordinate.y][foodCoordinate.x] = 3;

      return baseScreen;
    };

    const matrixRenderScreen = renderScreen(snakeCoordinates);
    setScreenMatrix(matrixRenderScreen);
  }, [snakeCoordinates, foodCoordinate]);

  return (
    <div className="container">
      <div className="App">
        {screenMatrix.map((row: Array<number>, index: number) => {
          return (
            <div className="App__row" key={index}>
              {row.map((point: number, index: number) => (
                <SquarePoint key={index} color={getColorOfPoint(point)} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
