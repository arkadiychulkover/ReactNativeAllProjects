import React from "react";
import Svg, { Path, Circle } from "react-native-svg";

export default function MoonSvg({ size = 22, width, height }: { size?: number; width?: number; height?: number }) {
  const w = width ?? size;
  const h = height ?? size;

  return (
    <Svg width={w} height={h} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        fill="#FACC15"
        stroke="#EAB308"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="18" cy="6" r="1" fill="#FDE047" />
      <Circle cx="20" cy="10" r="0.75" fill="#FDE047" />
    </Svg>
  );
}
