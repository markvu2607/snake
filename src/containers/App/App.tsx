import React, { useState, useEffect } from "react";

import SquarePoint from "../../components/SquarePoint";
import { useSnake } from "../../hooks";

import { addTwoMatrices } from "../../utils";
import { initBasicScreenMatrix } from "../../constants";
import "./App.css";

function App() {
  const [snakeMatrix, setSnakeMatrix] = useSnake();

  const [screenMatrix, setScreenMatrix] = useState<Array<Array<number>>>(
    addTwoMatrices(initBasicScreenMatrix, snakeMatrix)
  );

  useEffect(() => {
    setInterval(() => {
      console.log("refresh screen");
    }, 1000);
  }, []);

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
