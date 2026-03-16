import { useEffect, useState } from "react";

export const AnimatedCounter = ({ end, duration = 1200 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const incrementTime = 16;
    const totalSteps = duration / incrementTime;
    const stepValue = end / totalSteps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <>{count}</>;
};