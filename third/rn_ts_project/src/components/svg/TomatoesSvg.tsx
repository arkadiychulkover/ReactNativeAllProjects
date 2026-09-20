import React from "react";
import Svg, { Circle, Path, Ellipse, G, Line } from "react-native-svg";

export default function TomatoesSvg({ width = 135, height = 95 }: { width?: number; height?: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 160 110" fill="none">
      <G stroke="#388E3C" strokeWidth="3" strokeLinecap="round">
        <Line x1="16" y1="52" x2="26" y2="58" />
        <Line x1="13" y1="72" x2="23" y2="73" />
        <Line x1="134" y1="35" x2="144" y2="42" />
        <Line x1="139" y1="54" x2="149" y2="56" />
      </G>
      <Ellipse cx="80" cy="100" rx="55" ry="6.5" fill="#000000" opacity={0.1} />
      <Circle
        cx="80"
        cy="52"
        r="28"
        fill="#E53935"
        stroke="#B71C1C"
        strokeWidth="2.8"
      />
      <Path
        d="M80 28 C79 21 84 15 86 13"
        stroke="#2E7D32"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M80 27 L75 19 M80 27 L88 23 M80 27 L83 32 M80 27 L70 29 M80 27 L73 32"
        stroke="#2E7D32"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Circle
        cx="54"
        cy="72"
        r="30"
        fill="#F44336"
        stroke="#B71C1C"
        strokeWidth="2.8"
      />
      <Path
        d="M38 60 C35 66 36 74 40 80"
        stroke="#FFCDD2"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Circle cx="39" cy="59" r="3" fill="#FFFFFF" opacity={0.75} />
      <Path
        d="M54 46 C53 38 58 33 60 31"
        stroke="#2E7D32"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M54 45 L44 41 M54 45 L64 41 M54 45 L48 51 M54 45 L60 51 M54 45 L54 36"
        stroke="#2E7D32"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Circle
        cx="102"
        cy="74"
        r="29"
        fill="#FF5252"
        stroke="#B71C1C"
        strokeWidth="2.8"
      />
      <Path
        d="M116 64 C118 70 117 78 113 83"
        stroke="#FFCDD2"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Circle cx="116" cy="63" r="3" fill="#FFFFFF" opacity={0.75} />
      <Path
        d="M102 48 C101 40 106 35 107 33"
        stroke="#2E7D32"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M102 47 L92 44 M102 47 L112 44 M102 47 L96 53 M102 47 L108 53 M102 47 L102 38"
        stroke="#2E7D32"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </Svg>
  );
}
