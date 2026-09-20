import React from "react";
import Svg, { Path, Circle, Ellipse, G, Line } from "react-native-svg";

export default function BananaSvg({ width = 135, height = 95 }: { width?: number; height?: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 160 110" fill="none">
      <G stroke="#388E3C" strokeWidth="3" strokeLinecap="round">
        <Line x1="16" y1="42" x2="24" y2="48" />
        <Line x1="8" y1="62" x2="18" y2="63" />
        <Line x1="140" y1="42" x2="148" y2="48" />
        <Line x1="142" y1="60" x2="151" y2="62" />
        <Line x1="138" y1="78" x2="146" y2="82" />
      </G>
      <Ellipse cx="80" cy="102" rx="45" ry="5" fill="#000000" opacity={0.1} />
      <Path
        d="M112 32 C95 48 68 52 32 44 C28 43 27 46 29 49 C42 62 76 68 108 42 Z"
        fill="#FFCA28"
        stroke="#4E342E"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <Circle cx="28" cy="46" r="3.5" fill="#4E342E" />
      <Path
        d="M110 36 C92 58 64 68 38 60 C34 59 33 63 36 66 C52 79 84 82 108 48 Z"
        fill="#FFD54F"
        stroke="#4E342E"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <Path
        d="M100 48 C82 66 60 72 42 63"
        stroke="#FFA000"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Circle cx="35" cy="62" r="3.5" fill="#4E342E" />
      <Path
        d="M106 42 C88 68 62 82 48 76 C44 74 43 78 47 81 C64 94 92 92 108 56 Z"
        fill="#FFE082"
        stroke="#4E342E"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <Path
        d="M96 56 C80 76 60 84 50 78"
        stroke="#FFF9C4"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <Circle cx="46" cy="78" r="3.5" fill="#4E342E" />
      <Path
        d="M104 28 C108 22 120 25 118 35 C114 42 106 40 102 34 Z"
        fill="#6D4C41"
        stroke="#3E2723"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <Ellipse cx="112" cy="27" rx="6" ry="3" fill="#8D6E63" />
    </Svg>
  );
}
