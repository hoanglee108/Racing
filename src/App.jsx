import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { Physics } from "@react-three/cannon";
import { useState } from "react";

function App() {
  const [bg, setBg] = useState("/textures/envmap.hdr");
  const [score, setScore] = useState(0);

  return (
    <>
      <Canvas>
        <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
          <Scene bg={bg} setScore={setScore} />
        </Physics>
      </Canvas>

      <div className="controls">
        <p>press w a s d to move</p>
        <p>press k to swap camera</p>
        <p>press r to reset</p>
        <p>press arrows for flips</p>
        <h2>Score: {score}</h2>
      </div>
    </>
  );
}

export default App;
