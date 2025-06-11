import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { Physics } from "@react-three/cannon";
import { useState } from "react";

function App() {
  const [bg, setBg] = useState("/textures/envmap.hdr");

  return (
    <>
      <Canvas>
        <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
          <Scene bg={bg} />
        </Physics>
      </Canvas>

      <div class="controls">
        <p>press w a s d to move</p>
        <p>press k to swap camera</p>
        <p>press r to reset</p>
        <p>press arrows for flips</p>
      </div>

      <div class="bg">
        <div class="box">
          <p>Background Current</p>
          <button onClick={() => setBg("/textures/envmap.hdr")}>Choose</button>
        </div>
        <div class="box">
          <p>Background Garden</p>
          <button onClick={() => setBg("/textures/garden.hdr")}>Choose</button>
        </div>
        <div class="box">
          <p>Background Sky</p>
          <button onClick={() => setBg("/textures/sky.hdr")}>Choose</button>
        </div>
        <div class="box">
          <p>Background Forest</p>
          <button onClick={() => setBg("/textures/forest.hdr")}>Choose</button>
        </div>
      </div>
    </>
  );
}

export default App;
