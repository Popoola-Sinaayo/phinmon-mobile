import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SendIcon(props: { color?: string }) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color || "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
  
    >
      <Path d="M14.536 21.686a.5.5 0 00.937-.024l6.5-19a.496.496 0 00-.635-.635l-19 6.5a.5.5 0 00-.024.937l7.93 3.18a2 2 0 011.112 1.11zM21.854 2.147l-10.94 10.939" />
    </Svg>
  );
}

export default SendIcon;
