import React from "react";
import Svg, { Path, Circle, G, Line } from "react-native-svg";

export default function BannerAppleSvg({ width = 64, height = 50 }: { width?: number; height?: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 64 52" fill="none">
      <G stroke="#2E7D32" strokeWidth="2" strokeLinecap="round">
        <Line x1="7" y1="20" x2="12" y2="24" />
        <Line x1="5" y1="31" x2="10" y2="31" />
        <Line x1="54" y1="28" x2="58" y2="30" />
        <Line x1="52" y1="36" x2="56" y2="38" />
      </G>
      <Path
        d="M55 13 C54 10 51 10 50 12 C49 10 46 10 45 13 C45 16 50 20 50 20 C50 20 55 16 55 13 Z"
        fill="#FF5252"
      />
      <Path
        d="M32 17 C31 11 34 7 36 5"
        stroke="#5D4037"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <Path
        d="M34 11 C40 5 48 7 51 9 C49 15 42 18 35 15 Z"
        fill="#4CAF50"
        stroke="#2E7D32"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <Path
        d="M32 18 C28 16 19 18 15 25 C11 33 13 43 21 48 C25 51 29 50 32 48 C35 50 39 51 43 48 C51 43 53 33 49 25 C45 18 36 16 32 18 Z"
        fill="#FF3B38"
        stroke="#800000"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Path
        d="M19 25 C16 30 17 36 20 39"
        stroke="#FFBABA"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Circle cx="19" cy="24" r="1.5" fill="#FFFFFF" />
      <Circle cx="27" cy="30" r="1.8" fill="#3E151A" />
      <Circle cx="37" cy="30" r="1.8" fill="#3E151A" />
      <Path
        d="M29 33 Q32 37 35 33"
        stroke="#3E151A"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <Circle cx="24" cy="33" r="2.2" fill="#FF8A80" opacity={0.8} />
      <Circle cx="40" cy="33" r="2.2" fill="#FF8A80" opacity={0.8} />
    </Svg>
  );
}
