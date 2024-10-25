import * as React from "react";
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

const DoubleArrowRight = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M13.4474 16C14.9204 14.9487 16.2413 13.718 17.3765 12.3401C17.5412 12.1402 17.5412 11.8598 17.3765 11.6599C16.2413 10.282 14.9204 9.05134 13.4474 8M6.5 16C7.97299 14.9487 9.29389 13.718 10.4291 12.3401C10.5938 12.1402 10.5938 11.8598 10.4291 11.6599C9.29389 10.282 7.97299 9.05134 6.5 8"
      stroke="url(#paint0_linear_806_5494)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_806_5494"
        x1={5.63158}
        y1={12.5714}
        x2={18.9467}
        y2={11.9849}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={props.color} />
        <Stop offset={1} stopColor={props.color} />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default DoubleArrowRight;
