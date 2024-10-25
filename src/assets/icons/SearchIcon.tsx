import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SearchIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      d="M17.125 17.125L12.3352 12.3352M12.3352 12.3352C13.3381 11.3324 13.9583 9.94696 13.9583 8.41667C13.9583 5.35609 11.4772 2.875 8.41667 2.875C5.35609 2.875 2.875 5.35609 2.875 8.41667C2.875 11.4772 5.35609 13.9583 8.41667 13.9583C9.94696 13.9583 11.3324 13.3381 12.3352 12.3352Z"
      stroke={props.color}
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SearchIcon;
