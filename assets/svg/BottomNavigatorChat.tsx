import * as React from "react";
import Svg, { Path } from "react-native-svg";

function BottomNavigatorChat(props: {color?: string}) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 35 31"
      fill="none"
    >
      <Path
        d="M12.695 22.234c5.327-.296 9.555-4.709 9.555-10.11C22.25 6.535 17.717 2 12.125 2S2 6.533 2 12.125c0 1.992.575 3.85 1.57 5.417l-.716 2.146-.002.003c-.274.823-.41 1.234-.313 1.508a.846.846 0 00.512.511c.273.098.682-.039 1.498-.31l.012-.004 2.147-.716a10.078 10.078 0 005.987 1.554zm0 0s0 0 0 0zm0 0C14.081 26.174 17.835 29 22.25 29c1.992 0 3.85-.576 5.416-1.57l2.147.716h.004c.822.274 1.234.412 1.508.314a.842.842 0 00.51-.512c.098-.274-.039-.685-.314-1.51l-.715-2.146.24-.398a10.077 10.077 0 001.328-5.02c0-5.591-4.532-10.124-10.124-10.124l-.38.007-.19.01"
        stroke={props?.color || "#818181"}
        strokeWidth={3.37497}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default BottomNavigatorChat;
