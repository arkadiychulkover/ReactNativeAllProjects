import React from "react";
import Svg, { Path, Ellipse, G, Line } from "react-native-svg";

export default function LettuceSvg({ width = 135, height = 95 }: { width?: number; height?: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 160 110" fill="none">
      <G stroke="#388E3C" strokeWidth="3" strokeLinecap="round">
        <Line x1="16" y1="44" x2="25" y2="49" />
        <Line x1="14" y1="64" x2="23" y2="65" />
        <Line x1="136" y1="44" x2="145" y2="50" />
        <Line x1="138" y1="64" x2="147" y2="66" />
      </G>
      <Ellipse cx="80" cy="100" rx="52" ry="6.5" fill="#000000" opacity={0.1} />
      <Path
        d="M30 74 C18 64 18 46 32 36 C32 24 46 16 60 22 C70 8 92 6 106 18 C120 10 136 18 142 32 C152 40 154 62 142 76 C150 90 134 104 114 102 C100 107 68 107 52 102 C35 104 22 90 30 74 Z"
        fill="#4CAF50"
        stroke="#1B5E20"
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
      <Path
        d="M42 70 C32 56 38 40 52 34 C58 22 78 20 90 28 C102 17 122 22 128 36 C138 48 134 68 122 78 C118 94 96 100 82 96 C65 100 46 90 42 70 Z"
        fill="#66BB6A"
        stroke="#1B5E20"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <Path
        d="M54 78 C46 64 50 44 64 38 C74 30 90 32 96 44 C108 36 120 44 116 62 C120 80 102 94 84 94 C70 94 58 88 54 78 Z"
        fill="#81C784"
        stroke="#1B5E20"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <Path
        d="M82 92 C82 72 80 52 80 44"
        stroke="#E8F5E9"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M81 68 C70 60 62 58 59 58"
        stroke="#E8F5E9"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Path
        d="M81 63 C92 55 104 55 107 55"
        stroke="#E8F5E9"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Path
        d="M81 80 C68 74 62 74 60 75"
        stroke="#E8F5E9"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Path
        d="M81 77 C94 71 102 73 108 76"
        stroke="#E8F5E9"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </Svg>
  );
}
