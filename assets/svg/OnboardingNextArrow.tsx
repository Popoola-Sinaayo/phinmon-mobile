import * as React from "react";
import Svg, { Path } from "react-native-svg";

function OnboardingNextArrow() {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 30 30"
      fill="none"
    >
      <Path
        d="M17.961 18.478l2.397-5.64m0 0l-5.64-2.397m5.64 2.396L9.642 17.163m17.413-7.029c-2.687-6.658-10.263-9.876-16.92-7.19C3.475 5.633.257 13.209 2.944 19.867c2.687 6.658 10.263 9.876 16.92 7.19 6.659-2.688 9.877-10.264 7.19-16.922z"
        stroke="#fff"
        strokeWidth={2.88889}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default OnboardingNextArrow;
