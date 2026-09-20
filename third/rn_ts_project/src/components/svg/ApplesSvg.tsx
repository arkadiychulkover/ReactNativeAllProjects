import React from "react";
import Svg, { Path, Circle, Ellipse, G, Line } from "react-native-svg";

export default function ApplesSvg({ width = 135, height = 95 }: { width?: number; height?: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 160 110" fill="none">
      <G stroke="#388E3C" strokeWidth="3" strokeLinecap="round">
        <Line x1="126" y1="36" x2="134" y2="44" />
        <Line x1="136" y1="56" x2="145" y2="58" />
      </G>
      <Ellipse cx="80" cy="100" rx="50" ry="6" fill="#000000" opacity={0.1} />
      <Path
        d="M64 42 C62 28 68 18 73 12"
        stroke="#5D4037"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <Path
        d="M72 26 C82 12 102 14 112 17 C109 30 94 42 76 36 Z"
        fill="#66BB6A"
        stroke="#2E7D32"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <Path
        d="M74 27 C88 24 100 23 110 18"
        stroke="#388E3C"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M64 42 C54 38 34 40 26 55 C16 71 19 92 36 100 C46 105 57 104 64 99 C68 103 80 104 88 99 C102 88 105 67 97 53 C89 39 72 38 64 42 Z"
        fill="#E53935"
        stroke="#B71C1C"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <Path
        d="M32 58 C28 68 30 80 38 88"
        stroke="#FF8A80"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M100 56 C98 44 106 34 110 32"
        stroke="#5D4037"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <Path
        d="M99 56 C92 51 76 55 67 67 C58 80 61 97 74 105 C82 110 92 109 97 105 C103 109 113 110 120 103 C133 93 134 75 126 63 C118 51 106 48 99 56 Z"
        fill="#FF5252"
        stroke="#B71C1C"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <Path
        d="M76 68 C71 77 73 89 80 94"
        stroke="#FFCDD2"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Circle cx="76" cy="67" r="3" fill="#FFFFFF" opacity={0.75} />
    </Svg>
  );
}
