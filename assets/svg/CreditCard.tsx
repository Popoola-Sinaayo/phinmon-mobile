import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

interface CreditCardIconProps {
  color?: string;
}

function CreditCardIcon({ color = "#000000" }: CreditCardIconProps) {
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
      <Rect width={20} height={14} x={2} y={5} rx={2} />
      <Path d="M2 10L22 10" />
    </Svg>
  );
}

export default CreditCardIcon;
