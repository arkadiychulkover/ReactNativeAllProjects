import React from "react";
import Svg, { Path, Circle } from "react-native-svg";

export default function BannerHeartSvg({ width = 44, height = 44, isDarkMode = false }: { width?: number; height?: number; isDarkMode?: boolean }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 44 44" fill="none">
      <Circle
        cx="22"
        cy="22"
        r="20"
        fill={isDarkMode ? "#1B3E28" : "#CBEFD8"}
        stroke={isDarkMode ? "#27593B" : "#A9E2BE"}
        strokeWidth="1.5"
      />
      <Path
        d="M22 17 C20.5 13 16 12 13 15 C10 18 10 23 13 26 L22 32 L31 26 C34 23 34 18 31 15 C28 12 23.5 13 22 17 Z"
        fill="#FF5252"
        stroke="#2E7D32"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <Circle cx="16" cy="17" r="1.8" fill="#FFCDD2" />
      <Circle cx="15.5" cy="16.5" r="0.9" fill="#FFFFFF" />
    </Svg>
  );
}
