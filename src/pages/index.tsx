import Draggable from "react-draggable";
import { CompassBackground } from "@/components/CompassBackground";

export default function Home() {
  return (
    <CompassBackground>
      <Draggable>
        <div className="cursor-pointer p-4 bg-white rounded shadow">
          drag me!
        </div>
      </Draggable>
    </CompassBackground>
  );
}
