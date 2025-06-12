// Meteor.jsx
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function randomVector3(range = 5) {
  return new THREE.Vector3(
    (Math.random() - 0.5) * range * 2,
    Math.random() * 5 + 5,
    (Math.random() - 0.5) * range * 2
  );
}

export function Meteor({ onHit }) {
  const meteorRef = useRef();

  // Tạo meteor mới mỗi lần reset
  useEffect(() => {
    if (meteorRef.current) {
      meteorRef.current.position.copy(randomVector3(5));
    }
  }, []);

  const rotationSpeed = new THREE.Vector3(
    Math.random(),
    Math.random(),
    Math.random()
  );

  const geometry = new THREE.IcosahedronGeometry(0.3 + Math.random() * 0.3, 1);

  useFrame((state, delta) => {
    if (meteorRef.current) {
      meteorRef.current.position.y -= delta * 2;
      meteorRef.current.rotation.x += delta * rotationSpeed.x;
      meteorRef.current.rotation.y += delta * rotationSpeed.y;
      meteorRef.current.rotation.z += delta * rotationSpeed.z;

      if (meteorRef.current.position.y < -1) {
        meteorRef.current.position.copy(randomVector3(5));
      }

      // Kiểm tra va chạm với xe (ở vị trí (x, y, z) tạm thời)
      const carPos = new THREE.Vector3(-1.5, 0.5, 3);
      const distance = meteorRef.current.position.distanceTo(carPos);
      if (distance < 0.7) {
        onHit(); // Gọi hàm báo va chạm
        meteorRef.current.position.copy(randomVector3(5));
      }
    }
  });

  return (
    <mesh ref={meteorRef} geometry={geometry}>
      <meshStandardMaterial color="brown" flatShading />
    </mesh>
  );
}
