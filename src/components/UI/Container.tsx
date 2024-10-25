import { white } from "@/src/constants/colors";
import React from "react";
import { SafeAreaView, StyleSheet, ViewProps } from "react-native";

interface ContainerProps extends ViewProps {}

const Container: React.FC<ContainerProps> = ({ style, children, ...rest }) => {
  return (
    <SafeAreaView style={[styles.container, style]} {...rest}>
      {children}
    </SafeAreaView>
  );
};

export default React.memo(Container);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white[800],
  },
});
