import React, { useEffect, useState, useRef } from "react";
import { CompassBackground } from "@/components/CompassBackground";
import Draggable from "react-draggable";

export default function Results() {
  const debug = false;
  const compassRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [average, setAverage] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchAverage = async () => {
      const response = await fetch("/api/votes");
      const data = await response.json();
      setAverage(data);
    };

    fetchAverage();
    const intervalId = setInterval(fetchAverage, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <h1 className="text-xl  bg-black rounded shadow flex items-center justify-center text-white">
        `x:{average.x}, y:{average.y}, compassWidth:
        {compassRef.current?.clientWidth}`
      </h1>

      <CompassBackground ref={compassRef}>
        <Draggable bounds="parent" position={average} disabled>
          <div className="text-xs cursor-pointer p-5 bg-black rounded shadow w-0 h-0 flex items-center justify-center text-white">
            `x:{average.x}, y:{average.y}`
          </div>
        </Draggable>
      </CompassBackground>
    </>
  );
}
