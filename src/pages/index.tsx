import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import { CompassBackground } from "@/components/CompassBackground";

export default function Home() {
  const compassRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPositionCalculated, setIsPositionCalculated] = useState(false);
  const [dragEnabled, setDragEnabled] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (compassRef.current) {
      const compass = compassRef.current.getBoundingClientRect();
      const divPadding = 40; // Assuming p-5 = 20px padding on each side
      const center = (compass.width - divPadding) / 2;
      setPosition({ x: center, y: center });
      centerRef.current = { x: center, y: center };
      setIsPositionCalculated(true);
      const savedTimeLeft = localStorage.getItem("timeLeft");
      const savedEndTime = localStorage.getItem("endTime");

      if (savedTimeLeft && savedEndTime) {
        const endTime = parseInt(savedEndTime, 10);
        const currentTime = Date.now();
        const remainingTime = Math.ceil((endTime - currentTime) / 1000);

        if (remainingTime > 0) {
          setTimeLeft(remainingTime);
          setDragEnabled(false);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setDragEnabled(true);
    }
  }, [timeLeft]);

  const handleDragStart = (e: any, data: any) => {
    if (!dragEnabled) {
      e.preventDefault();
    }
  };

  const handleDragStop = (e: any, data: any) => {
    const countdownDuration = 15;
    setDragEnabled(false);
    setTimeLeft(countdownDuration);

    const endTime = Date.now() + countdownDuration * 1000;
    localStorage.setItem("timeLeft", countdownDuration.toString());
    localStorage.setItem("endTime", endTime.toString());
  };

  return (
    <CompassBackground ref={compassRef}>
      {isPositionCalculated && (
        <Draggable
          bounds="parent"
          position={position}
          onStart={handleDragStart}
          onStop={handleDragStop}
          disabled={!dragEnabled}
        >
          <div className="text-xs cursor-pointer p-5 bg-black rounded shadow w-0 h-0 flex items-center justify-center text-white">
            {dragEnabled
              ? `x: ${position.x}, y: ${position.y}`
              : `Wait ${timeLeft} seconds`}
          </div>
        </Draggable>
      )}
    </CompassBackground>
  );
}
