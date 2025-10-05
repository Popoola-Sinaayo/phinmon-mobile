import * as React from "react";
import Svg, { Path } from "react-native-svg";

function MiscellaneousTransaction() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#616161"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M12.83 2.18a2 2 0 00-1.66 0L2.6 6.08a1 1 0 000 1.83l8.58 3.91a2 2 0 001.66 0l8.58-3.9a1 1 0 000-1.83z" />
      <Path d="M2 12a1 1 0 00.58.91l8.6 3.91a2 2 0 001.65 0l8.58-3.9A1 1 0 0022 12" />
      <Path d="M2 17a1 1 0 00.58.91l8.6 3.91a2 2 0 001.65 0l8.58-3.9A1 1 0 0022 17" />
    </Svg>
  );
}

export default MiscellaneousTransaction;
