import {
  StyleSheet,
  Text,
  View as CustomView,
  ViewProps,
  KeyboardAvoidingView as Kaav,
  Pressable as Press,
  PressableProps,
} from "react-native";
import React, { useContext } from "react";
import themeContext from "../../../config/theme/themeContext";

const View: React.FC<ViewProps> = (
  props: React.PropsWithChildren<ViewProps>
) => {
  const theme = useContext(themeContext);
  return (
    <CustomView
      style={{
        backgroundColor: theme.background,
      }}
    >
      {props.children}
    </CustomView>
  );
};

export const KeyboardAvoidingView = (
  props: React.PropsWithChildren<ViewProps>
) => {
  const theme = useContext(themeContext);

  return (
    <Kaav
      style={{
        backgroundColor: theme.background,
        flex: 1,
      }}
    >
      <>{props.children}</>
    </Kaav>
  );
};

export const Pressable = (props: React.PropsWithChildren<PressableProps>) => {
  const theme = useContext(themeContext);

  return (
    <Press
      style={{
        backgroundColor: theme.background,
      }}
    >
      {props.children}
    </Press>
  );
};

export default View;

const styles = StyleSheet.create({});
