import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

function TransportTransaction() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#0288D1"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M8 6v6M15 6v6M2 12h19.6M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 00-2 2v10h3" />
      <Circle cx={7} cy={18} r={2} />
      <Path d="M9 18h5" />
      <Circle cx={16} cy={18} r={2} />
    </Svg>
  );
}

export default TransportTransaction;
