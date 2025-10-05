import * as React from "react";
import Svg, { Path } from "react-native-svg";

function BankTransaction() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#455A64"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M10 18v-7M11.12 2.198a2 2 0 011.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949zM14 18v-7M18 18v-7M3 22h18M6 18v-7" />
    </Svg>
  );
}

export default BankTransaction;
