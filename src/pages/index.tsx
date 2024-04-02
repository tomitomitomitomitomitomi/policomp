import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { CompassBackground } from "@/components/CompassBackground";

export default function Home() {
  const compassRef = useRef<HTMLDivElement | null>(null);
  const [defaultPosition, setDefaultPosition] = useState({ x: 0, y: 0 });
  const [isPositionCalculated, setIsPositionCalculated] = useState(false);

  useEffect(() => {
    if (compassRef.current) {
      const compass = compassRef.current.getBoundingClientRect();
      const divPadding = 40; //p-5 = 20px por lado
      const center = (compass.width - divPadding) / 2;
      setDefaultPosition({ x: center, y: center });
      setIsPositionCalculated(true);
    }
  }, []);

  return (
    <CompassBackground ref={compassRef}>
      {isPositionCalculated && (
        <Draggable bounds="parent" defaultPosition={defaultPosition}>
          <div className="text-xs cursor-pointer p-5 bg-black rounded shadow w-0 h-0 flex items-center justify-center text-white">
            {`x_1: ${defaultPosition.x}, y_1: ${defaultPosition.y}`}
          </div>
        </Draggable>
      )}
    </CompassBackground>
  );
}
