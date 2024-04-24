import React, { useEffect, useState } from "react";
import { CompassBackground } from "@/components/CompassBackground";
import Draggable from "react-draggable";

export default function Results() {
  const debug = true;
  const [average, setAverage] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchAverage = async () => {
      const response = await fetch("/api/vote");
      const data = await response.json();
      console.log(data);
      setAverage(data);
    };

    fetchAverage();
    const intervalId = setInterval(fetchAverage, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return debug ? (
    <h1 className="text-xl  bg-black rounded shadow flex items-center justify-center text-white">
      `x:{average.x}, y:{average.y}`
    </h1>
  ) : (
    <CompassBackground>
      <Draggable bounds="parent" position={average}>
        <div className="text-xs cursor-pointer p-5 bg-black rounded shadow w-0 h-0 flex items-center justify-center text-white">
          `x:{average.x}, y:{average.y}`
        </div>
      </Draggable>
    </CompassBackground>
  );
}
