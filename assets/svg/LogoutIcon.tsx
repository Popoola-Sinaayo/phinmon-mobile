import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface LogoutIconProps {
  color?: string;
}

function LogoutIcon({ color = "#000000" }: LogoutIconProps) {
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
      <Path d="M16 17l5-5-5-5M21 12H9M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    </Svg>
  );
}

export default LogoutIcon;
