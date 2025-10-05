import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SavingsTransaction() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#388E3C"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M11 17h3v2a1 1 0 001 1h2a1 1 0 001-1v-3a3.16 3.16 0 002-2h1a1 1 0 001-1v-2a1 1 0 00-1-1h-1a5 5 0 00-2-4V3a4 4 0 00-3.2 1.6l-.3.4H11a6 6 0 00-6 6v1a5 5 0 002 4v3a1 1 0 001 1h2a1 1 0 001-1zM16 10h.01M2 8v1a2 2 0 002 2h1" />
    </Svg>
  );
}

export default SavingsTransaction;
