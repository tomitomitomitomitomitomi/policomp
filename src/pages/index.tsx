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
      const divSize = 64;
      const centerX = (compass.width - divSize) / 2;
      const centerY = (compass.width - divSize) / 2;
      setDefaultPosition({ x: centerX - 18, y: centerY - 18 });
      setIsPositionCalculated(true);
    }
  }, []);

  return (
    <CompassBackground ref={compassRef}>
      {isPositionCalculated && (
        <Draggable bounds="parent" defaultPosition={defaultPosition}>
          <div className="text-xs cursor-pointer p-2 bg-black rounded shadow w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center text-white">
            {`x_1: ${defaultPosition.x}, y_1: ${defaultPosition.y}`}
          </div>
        </Draggable>
      )}
    </CompassBackground>
  );
}
