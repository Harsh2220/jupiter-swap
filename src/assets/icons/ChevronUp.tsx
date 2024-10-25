import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const ChevronUp = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M16 13.8608C14.9379 12.399 13.6929 11.0896 12.2979 9.96664C12.1226 9.82557 11.8774 9.82557 11.7021 9.96664C10.3071 11.0896 9.06206 12.399 8 13.8608"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ChevronUp;
