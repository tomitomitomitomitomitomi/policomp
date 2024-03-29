import React from "react";

interface CompassBackgroundProps {
  children: React.ReactNode;
}

export const CompassBackground: React.FC<CompassBackgroundProps> = ({
  children,
}) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative flex w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] mx-auto">
        <div
          className="absolute w-1/2 h-1/2 top-0 left-0"
          style={{ backgroundColor: "#fea2a3", borderTopLeftRadius: "10px" }}
        ></div>
        <div
          className="absolute w-1/2 h-1/2 top-0 right-0"
          style={{ backgroundColor: "#9dc3e6", borderTopRightRadius: "10px" }}
        ></div>
        <div
          className="absolute w-1/2 h-1/2 bottom-0 left-0"
          style={{ backgroundColor: "#c4e0b4", borderBottomLeftRadius: "10px" }}
        ></div>
        <div
          className="absolute w-1/2 h-1/2 bottom-0 right-0"
          style={{
            backgroundColor: "#ffe699",
            borderBottomRightRadius: "10px",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
