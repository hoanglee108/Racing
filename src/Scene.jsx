// Scene.jsx
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Car } from "./Car";
import { Ground } from "./Ground";
import { Track } from "./Track";
import { Meteor } from "./meteor";
import { useScore } from "./useScore";

export function Scene({ bg, setScore }) {
  const [thirdPerson, setThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

  const chassisApiRef = useRef(null); // Đây là API từ useBox
  const meteorHitRef = useRef(false);
  const scoreRef = useRef(0);

  useScore(chassisApiRef.current, meteorHitRef, (newScore) => {
    scoreRef.current = newScore;
    setScore(newScore);
  });

  useFrame(() => {
    console.log("Current score:", scoreRef.current);
  });

  useEffect(() => {
    function keydownHandler(e) {
      if (e.key == "k") {
        if (thirdPerson)
          setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
        setThirdPerson(!thirdPerson);
      }
    }

    window.addEventListener("keydown", keydownHandler);
    return () => window.removeEventListener("keydown", keydownHandler);
  }, [thirdPerson]);

  return (
    <Suspense fallback={null}>
      <Environment files={process.env.PUBLIC_URL + bg} background={"both"} />
      <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
      {!thirdPerson && <OrbitControls target={[-2.64, -0.71, 0.03]} />}
      <Ground />
      <Track />
      <Car thirdPerson={thirdPerson} chassisRef={chassisApiRef} />
      <Meteor onHit={() => (meteorHitRef.current = true)} />
    </Suspense>
  );
}
