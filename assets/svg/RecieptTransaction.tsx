import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ReceiptTransaction() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FB8C00"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z" />
      <Path d="M16 8h-6a2 2 0 100 4h4a2 2 0 110 4H8M12 17.5v-11" />
    </Svg>
  );
}

export default ReceiptTransaction;
