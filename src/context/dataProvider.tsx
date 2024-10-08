"use client";
import { createContext, useState, useContext } from "react";

const DataContext = createContext("inputData");

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [radius, setRadius] = useState(0);
  const [angle, setAngle] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [direction, setDirection] = useState(0);
  const [dataAirplane, setDataAirplane] = useState([
    { id: 0, x: 0, y: 0, direction: 0, radius: null, angle: null, speed: 0 },
  ]);

  const [coordinates, setCoordinates] = useState([
    { x: 0, y: 0, direction: 0 },
  ]);

  return (
    <DataContext.Provider
      value={{
        x,
        setX,
        y,
        setY,
        radius,
        setRadius,
        angle,
        setAngle,
        speed,
        setSpeed,
        direction,
        setDirection,
        coordinates,
        setCoordinates,
        dataAirplane,
        setDataAirplane,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
