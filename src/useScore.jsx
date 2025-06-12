import { useEffect, useRef } from "react";
import { Vector3 } from "three";

/**
 * 
 * @param {*} chassisApiRef - ref đến chassisApi (từ useBox)
 * @param {*} meteorHitRef - ref boolean cho biết có va chạm với thiên thạch
 * @param {*} onScoreUpdate - callback để cập nhật điểm ra ngoài (App)
 * @returns cleanup function
 */
export function useScore(chassisApiRef, meteorHitRef, onScoreUpdate) {
  const scoreRef = useRef(0);
  const wasMoving = useRef(false);

  useEffect(() => {
    if (!chassisApiRef?.velocity) return;

    const velocityVec = new Vector3();

    const interval = setInterval(() => {
      // Lấy tốc độ từ chassisApi
      chassisApiRef.velocity.subscribe((v) => {
        velocityVec.set(v[0], v[1], v[2]);
        const speed = velocityVec.length();

        if (speed > 1) {
          scoreRef.current += 1;
          wasMoving.current = true;
        } else {
          if (wasMoving.current) {
            scoreRef.current -= 500;
            wasMoving.current = false;
          }
        }

        if (meteorHitRef.current) {
          scoreRef.current -= 1000;
          meteorHitRef.current = false;
        }

        onScoreUpdate(scoreRef.current);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [chassisApiRef, meteorHitRef, onScoreUpdate]);
}
