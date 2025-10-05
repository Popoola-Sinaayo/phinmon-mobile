import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

function BottomNavigationSettings(props: { color?: string }) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props?.color || "#818181"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M9.671 4.136a2.34 2.34 0 014.659 0 2.34 2.34 0 003.319 1.915 2.34 2.34 0 012.33 4.033 2.34 2.34 0 000 3.831 2.34 2.34 0 01-2.33 4.033 2.34 2.34 0 00-3.319 1.915 2.34 2.34 0 01-4.659 0 2.34 2.34 0 00-3.32-1.915 2.34 2.34 0 01-2.33-4.033 2.34 2.34 0 000-3.831A2.34 2.34 0 016.35 6.051a2.34 2.34 0 003.319-1.915" />
      <Circle cx={12} cy={12} r={3} />
    </Svg>
  );
}

export default BottomNavigationSettings;
