import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface NotificationIconProps {
  color?: string;
}

function NotificationIcon({ color = "#000000" }: NotificationIconProps) {
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
      <Path d="M10.268 21a2 2 0 003.464 0M3.262 15.326A1 1 0 004 17h16a1 1 0 00.74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 006 8c0 4.499-1.411 5.956-2.738 7.326" />
    </Svg>
  );
}

export default NotificationIcon;
