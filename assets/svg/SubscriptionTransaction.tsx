import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SubscriptionTransaction() {
  return (
       <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
        stroke="#00838F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    
    >
      <Path d="M17 2l4 4-4 4" />
      <Path d="M3 11v-1a4 4 0 014-4h14M7 22l-4-4 4-4" />
      <Path d="M21 13v1a4 4 0 01-4 4H3" />
    </Svg>
  );
}

export default SubscriptionTransaction;
