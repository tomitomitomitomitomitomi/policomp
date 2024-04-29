import React, { useEffect, useState, useRef } from "react";
import { CompassBackground } from "@/components/CompassBackground";
import Draggable from "react-draggable";

export default function Results() {
  const debug = false;
  const compassPadding = 20;
  const compassRef = useRef<HTMLDivElement | null>(null);
  const [average, setAverage] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [hasInitialFetch, setHasInitialFetch] = useState(false);

  useEffect(() => {
    const fetchAverage = async (compassWidth: any) => {
      const response = await fetch("/api/votes");
      const data: { average: { x: number; y: number }; clean: boolean } =
        await response.json();
      if (!hasInitialFetch) {
        if (!data.clean) {
          setAverage({
            x: data.average.x * compassWidth,
            y: data.average.y * compassWidth,
          });
        }
        setHasInitialFetch(true);
      } else {
        setAverage({
          x: data.average.x * compassWidth,
          y: data.average.y * compassWidth,
        });
      }
    };

    const setupInterval = () => {
      if (compassRef.current) {
        const compassWidth =
          compassRef.current.getBoundingClientRect().width - compassPadding;
        if (!hasInitialFetch) {
          setAverage({
            x: (compassWidth - compassPadding) / 2,
            y: (compassWidth - compassPadding) / 2,
          });
        }
        fetchAverage(compassWidth);
        const intervalId = setInterval(() => {
          if (compassRef.current) {
            fetchAverage(
              compassRef.current.getBoundingClientRect().width - compassPadding
            );
          }
        }, 5000);
        return intervalId;
      }
      return null;
    };

    const intervalId = setupInterval();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      {debug && (
        <h1 className="text-xl bg-black rounded shadow flex items-center justify-center text-white">
          x:{average.x}, y:{average.y}, compassWidth:{" "}
          {compassRef.current?.clientWidth}
        </h1>
      )}

      <CompassBackground ref={compassRef}>
        <Draggable bounds="parent" position={average} disabled>
          <div className="text-xs cursor-pointer p-5 bg-black rounded shadow w-0 h-0 flex items-center justify-center text-white">
            x:{average.x}, y:{average.y}
          </div>
        </Draggable>
      </CompassBackground>
    </>
  );
}
