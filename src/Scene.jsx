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

  const chassisApiRef = useRef(null); // ✅ Để truyền nguyên ref
  const meteorHitRef = useRef(false);
  const scoreRef = useRef(0);

  // ✅ Nhận lại resetScore từ hook
  const { resetScore } = useScore(chassisApiRef, meteorHitRef, (newScore) => {
    scoreRef.current = newScore;
    setScore(newScore);
  });

  // ✅ Reset điểm khi nhấn "r"
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "r") {
        resetScore();
      } else if (e.key === "k") {
        // camera toggle
        if (thirdPerson)
          setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
        setThirdPerson((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [thirdPerson, resetScore]);

  // Debug điểm
  useFrame(() => {
    // console.log("Current score:", scoreRef.current);
  });

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
