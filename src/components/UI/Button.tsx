import { black, primary, white } from "@/src/constants/colors";
import React from "react";
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import { Heading } from "@/src/components/UI/Heading";

interface IButton extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: "filled" | "outlined";
  size?: "small" | "medium" | "large";
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: JSX.Element;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
  color?: string;
}

function Button({
  children,
  variant = "filled",
  size = "medium",
  textStyle,
  icon,
  iconPosition = "right",
  isLoading = false,
  color = primary,
  ...props
}: IButton) {
  const { width } = useWindowDimensions();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...props}
      disabled={isLoading || props.disabled}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal:
            size === "small" ? 36 : size === "medium" ? 48 : 60,
          paddingVertical: size === "small" ? 12 : size === "medium" ? 16 : 20,
          borderRadius: 50,
          backgroundColor: variant === "filled" ? color : "transparent",
          borderWidth: 1,
          borderColor: variant === "filled" ? "transparent" : white[300],
        },
        props.style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size={"small"} animating={true} color={"white"} />
      ) : (
        <>
          {icon && iconPosition === "left" ? icon : null}
          <Heading
            style={[
              {
                color: variant === "filled" ? white[700] : black[700],
                fontSize:
                  size === "small"
                    ? width / 26
                    : size === "medium"
                    ? width / 22
                    : width / 18,
                fontWeight: "700",
                textAlign: "center",
              },
              textStyle,
            ]}
          >
            {children}
          </Heading>
          {icon && iconPosition === "right" ? icon : null}
        </>
      )}
    </TouchableOpacity>
  );
}

export default React.memo(Button);
