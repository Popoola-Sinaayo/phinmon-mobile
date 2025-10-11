import * as React from "react";
import Svg, { Path } from "react-native-svg";

function PlusIcon({ color = "#ffffff", size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M5 12h14M12 5v14" />
    </Svg>
  );
}

export default PlusIcon;
