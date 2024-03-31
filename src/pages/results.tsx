import React, { useEffect, useState } from "react";

export default function Results() {
  const [average, setAverage] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchAverage = async () => {
      const response = await fetch("/api/vote");
      const data = await response.json();
      setAverage(data);
    };

    fetchAverage();
    const intervalId = setInterval(fetchAverage, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div>
      <h1 className="text-black">Average Vote Position</h1>
      <p className="text-black">
        X: {average.x.toFixed(2)}, Y: {average.y.toFixed(2)}
      </p>
    </div>
  );
}
