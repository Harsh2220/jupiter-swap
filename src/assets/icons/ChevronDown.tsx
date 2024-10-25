import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const ChevronDown = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M8 10.1392C9.06206 11.601 10.3071 12.9104 11.7021 14.0334C11.8774 14.1744 12.1226 14.1744 12.2979 14.0334C13.6929 12.9104 14.9379 11.601 16 10.1392"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ChevronDown;
