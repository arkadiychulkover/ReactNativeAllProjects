import React from "react";
import Svg, { Circle, G, Line } from "react-native-svg";

export default function SunSvg({ size = 22, width, height }: { size?: number; width?: number; height?: number }) {
  const w = width ?? size;
  const h = height ?? size;

  return (
    <Svg width={w} height={h} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="4.5" fill="#FFA500" stroke="#FFA500" strokeWidth="1" />
      <G stroke="#FFA500" strokeWidth="2" strokeLinecap="round">
        <Line x1="12" y1="1.5" x2="12" y2="4.5" />
        <Line x1="12" y1="19.5" x2="12" y2="22.5" />
        <Line x1="1.5" y1="12" x2="4.5" y2="12" />
        <Line x1="19.5" y1="12" x2="22.5" y2="12" />
        <Line x1="4.58" y1="4.58" x2="6.7" y2="6.7" />
        <Line x1="17.3" y1="17.3" x2="19.42" y2="19.42" />
        <Line x1="4.58" y1="19.42" x2="6.7" y2="17.3" />
        <Line x1="17.3" y1="6.7" x2="19.42" y2="4.58" />
      </G>
    </Svg>
  );
}
