import React from "react";
import "./SquarePoint.css";

interface SquarePointProps {
  color: "black" | "white" | "red" | "green";
}

function SquarePoint({ color }: SquarePointProps) {
  return <div className={`square-point ${color}`} />;
}

export default SquarePoint;
