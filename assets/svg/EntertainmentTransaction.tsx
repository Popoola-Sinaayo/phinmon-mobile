import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

function EntertainmentTransaction() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#D81B60"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Rect width={18} height={18} x={3} y={3} rx={2} />
      <Path d="M7 3v18M3 7.5h4M3 12h18M3 16.5h4M17 3v18M17 7.5h4M17 16.5h4" />
    </Svg>
  );
}

export default EntertainmentTransaction;
