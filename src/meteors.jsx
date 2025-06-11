// Meteors.jsx
import { Meteor } from "./meteor";

export function Meteors({ count = 5 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Meteor key={index} />
      ))}
    </>
  );
}
