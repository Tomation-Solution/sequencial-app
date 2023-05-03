import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { scale } from "react-native-size-matters";

type Props = {
  image: any;
  navigationComponent?: any;
  children: any;
};

const { width, height } = Dimensions.get("window");

const IMAGE_HEIGHT = height * 0.35;
const CONTENT_HEIGHT = height * 0.8;

const Container: React.FC<Props> = ({
  image,
  children,
  navigationComponent,
}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        position: "relative",
      }}
    >
      <View
        style={{
          position: "absolute",
          width: "100%",
          zIndex: 10,
        }}
      >
        {navigationComponent}
      </View>
      <Image
        source={image}
        style={{ width: "100%", height: IMAGE_HEIGHT }}
        resizeMode="cover"
      />
      <View
        style={{
          position: "absolute",
          top: IMAGE_HEIGHT - scale(20),
          // top: -scale(20),
          width: "100%",
          height: CONTENT_HEIGHT,
          backgroundColor: "#fff",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 20,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default Container;

const styles = StyleSheet.create({});
