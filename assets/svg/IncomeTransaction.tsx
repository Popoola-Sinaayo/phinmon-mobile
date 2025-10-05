import * as React from "react";
import Svg, { Path } from "react-native-svg";

function IncomeTransaction() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#2E7D32"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M19 7V4a1 1 0 00-1-1H5a2 2 0 000 4h15a1 1 0 011 1v4h-3a2 2 0 000 4h3a1 1 0 001-1v-2a1 1 0 00-1-1" />
      <Path d="M3 5v14a2 2 0 002 2h15a1 1 0 001-1v-4" />
    </Svg>
  );
}

export default IncomeTransaction;
