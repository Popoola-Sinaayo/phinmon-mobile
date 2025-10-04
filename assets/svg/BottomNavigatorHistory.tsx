import * as React from "react";
import Svg, { Path } from "react-native-svg";

function BottomNavigatorHistory(props: {color?: string}) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 24 27"
      fill="none"
    >
      <Path
        d="M13.246 12.575h-7.05m2.35 4.7h-2.35m9.4-9.4h-9.4m14.1 4.113V7.64c0-1.974 0-2.961-.384-3.715a3.525 3.525 0 00-1.54-1.54C17.616 2 16.63 2 14.655 2h-7.52c-1.974 0-2.961 0-3.715.384a3.525 3.525 0 00-1.54 1.54c-.385.755-.385 1.742-.385 3.716v12.22c0 1.974 0 2.961.384 3.715a3.525 3.525 0 001.54 1.54c.755.385 1.742.385 3.716.385h3.173m12.337 0l-1.762-1.762m1.175-2.938a4.112 4.112 0 11-8.225 0 4.112 4.112 0 018.225 0z"
        stroke={props?.color || "#818181"}
        strokeWidth={2.35}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default BottomNavigatorHistory;
