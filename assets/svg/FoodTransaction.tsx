import * as React from "react";
import Svg, { Path } from "react-native-svg";

function FoodTransaction() {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FF7043"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      //   className="lucide lucide-utensils-crossed-icon lucide-utensils-crossed"
    >
      <Path d="M16 2l-2.3 2.3a3 3 0 000 4.2l1.8 1.8a3 3 0 004.2 0L22 8M15 15L3.3 3.3a4.2 4.2 0 000 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15zm0 0l7 7M2.1 21.8l6.4-6.3M19 5l-7 7" />
    </Svg>
  );
}

export default FoodTransaction;
