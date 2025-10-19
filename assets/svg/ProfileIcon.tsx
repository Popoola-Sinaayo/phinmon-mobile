import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

interface ProfileIconProps {
  color?: string;
}

function ProfileIcon({ color = "#000000" }: ProfileIconProps) {
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
      <Path d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2" />
      <Circle cx={12} cy={7} r={4} />
    </Svg>
  );
}

export default ProfileIcon;
