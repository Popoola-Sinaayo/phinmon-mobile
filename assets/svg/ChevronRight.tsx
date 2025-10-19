import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface ChevronRightProps {
  color?: string;
}

function ChevronRight({ color = "#000000" }: ChevronRightProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M9 18l6-6-6-6" />
    </Svg>
  );
}

export default ChevronRight
