import * as React from "react";
import Svg, { Path } from "react-native-svg";

function HashIcon() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M4 9L20 9" />
      <Path d="M4 15L20 15" />
      <Path d="M10 3L8 21" />
      <Path d="M16 3L14 21" />
    </Svg>
  );
}

export default HashIcon;
