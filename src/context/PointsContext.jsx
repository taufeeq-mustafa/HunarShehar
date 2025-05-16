import React, { createContext, useState, useEffect } from 'react';

export const PointsContext = createContext();

export const PointsProvider = ({ children }) => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const storedPoints = localStorage.getItem('points');
    if (storedPoints) {
      setPoints(parseInt(storedPoints, 10));
    }
  }, []);

  const addPoints = (amount) => {
    setPoints((prev) => {
      const newPoints = prev + amount;
      localStorage.setItem('points', newPoints.toString());
      return newPoints;
    });
  };

  return (
    <PointsContext.Provider value={{ points, addPoints }}>
      {children}
    </PointsContext.Provider>
  );
}; 