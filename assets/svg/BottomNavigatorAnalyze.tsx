import * as React from "react";
import Svg, { Path } from "react-native-svg";

function BottomNavigatorAnalyze(props: {color?: string}) {
  return (
    <Svg
      width={32}
      height={27}
      viewBox="0 0 32 27"
      fill="none"
    >
      <Path
        d="M2 17.334v2.76c0 1.717 0 2.575.334 3.231a3.068 3.068 0 001.34 1.341C4.33 25 5.188 25 6.902 25H29.6M2 17.334V2m0 15.334l5.909-4.924.004-.004c1.07-.89 1.605-1.337 2.185-1.518a3.065 3.065 0 012.089.095c.562.233 1.056.727 2.043 1.713l.01.01c1.001 1.002 1.504 1.505 2.075 1.738.677.275 1.43.299 2.123.069.588-.195 1.125-.664 2.199-1.603L29.6 5.067"
        stroke={props?.color || "#818181"}
        strokeWidth={3.06667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default BottomNavigatorAnalyze;
