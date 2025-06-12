import { useEffect, useRef } from "react";
import { Vector3 } from "three";

/**
 * @param {*} chassisApiRef - ref đến chassisApi từ useBox
 * @param {*} meteorHitRef - ref boolean để kiểm tra va chạm thiên thạch
 * @param {*} onScoreUpdate - callback để cập nhật điểm
 * @returns resetScore - hàm reset điểm
 */
export function useScore(chassisApiRef, meteorHitRef, onScoreUpdate) {
  const scoreRef = useRef(0);
  const wasMoving = useRef(false);
  const latestVelocity = useRef(new Vector3());

  useEffect(() => {
    if (!chassisApiRef?.current?.velocity) return;

    // ✅ Subscribe MỘT LẦN DUY NHẤT để cập nhật vận tốc vào biến ref
    const unsubscribe = chassisApiRef.current.velocity.subscribe((v) => {
      latestVelocity.current.set(v[0], v[1], v[2]);
    });

    // ✅ Dùng interval tính toán dựa trên vận tốc đã lưu
    const interval = setInterval(() => {
      const speed = latestVelocity.current.length();

      if (speed > 1) {
        scoreRef.current += 1;
        wasMoving.current = true;
      } else if (wasMoving.current) {
        scoreRef.current -= 5;
        wasMoving.current = false;
      }

      if (meteorHitRef.current) {
        scoreRef.current -= 10;
        meteorHitRef.current = false;
      }

      onScoreUpdate(scoreRef.current);
    }, 1000);

    // ✅ Clear đúng cả subscription lẫn interval
    return () => {
      clearInterval(interval);
      unsubscribe(); // rất quan trọng!
    };
  }, [chassisApiRef, meteorHitRef, onScoreUpdate]);

  // Hàm reset điểm
  const resetScore = () => {
    scoreRef.current = 0;
    wasMoving.current = false;
    onScoreUpdate(0);
  };

  return { resetScore };
}
