import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";

function GiftingsTransaction() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#F9A825"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Rect x={3} y={8} width={18} height={4} rx={1} />
      <Path d="M12 8v13M19 12v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7M7.5 8a2.5 2.5 0 010-5A4.8 8 0 0112 8a4.8 8 0 014.5-5 2.5 2.5 0 010 5" />
    </Svg>
  );
}

export default GiftingsTransaction;
