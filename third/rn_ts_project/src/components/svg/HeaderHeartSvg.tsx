import React from "react";
import Svg, { Path, Circle, G, Line } from "react-native-svg";

export default function HeaderHeartSvg({ width = 36, height = 30 }: { width?: number; height?: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 40 34" fill="none">
      <G stroke="#FF5252" strokeWidth="2.5" strokeLinecap="round">
        <Line x1="12" y1="4" x2="14" y2="8" />
        <Line x1="26" y1="3" x2="25" y2="7" />
        <Line x1="34" y1="10" x2="30" y2="13" />
        <Line x1="36" y1="20" x2="31" y2="20" />
        <Line x1="32" y1="28" x2="28" y2="25" />
      </G>
      <Path
        d="M20 11 C18 6 12 5 8 9 C4 13 4 19 8 23 L20 31 L32 23 C36 19 36 13 32 9 C28 5 22 6 20 11 Z"
        fill="#FF3838"
        stroke="#D32F2F"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <Circle cx="13" cy="13" r="2.5" fill="#FFA4A4" />
      <Circle cx="12" cy="12" r="1.2" fill="#FFFFFF" />
    </Svg>
  );
}
