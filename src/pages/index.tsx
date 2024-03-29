import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { CompassBackground } from "@/components/CompassBackground";

export default function Home() {
  const compassRef = useRef<HTMLDivElement>(null); // Create a ref for the compass
  const [defaultPosition, setDefaultPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (compassRef.current) {
      const compass = compassRef.current.getBoundingClientRect();
      const divSize = 64;
      const centerX = (compass.width - divSize) / 2;
      const centerY = (compass.height - divSize) / 2;
      setDefaultPosition({ x: centerX, y: centerY });
    }
  }, []); // Empty dependency array ensures this runs once after initial render

  return (
    <CompassBackground ref={compassRef}>
      <Draggable bounds="parent" defaultPosition={defaultPosition}>
        <div className="cursor-pointer p-2 bg-black rounded shadow w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center text-white">
          {defaultPosition.x.toString()}
        </div>
      </Draggable>
    </CompassBackground>
  );
}
