import * as React from "react";
import Svg, { Path } from "react-native-svg";

function DonationTransaction() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6A1B9A"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M11 14h2a2 2 0 000-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
      <Path d="M14.45 13.39l5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 00-4.797-1.837.276.276 0 01-.406 0A2.75 2.75 0 0011 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95M2 15l6 6" />
      <Path d="M7 20l1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 00-2.75-2.91" />
    </Svg>
  );
}

export default DonationTransaction;
