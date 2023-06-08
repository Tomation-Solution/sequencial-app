import { Animated, Image, Modal, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef } from "react";
import { placeholders } from "../../../assets/placeholders";
import { images } from "../../../assets";
import { StatusBar } from "expo-status-bar";

const Loading = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // Adjust the duration as desired
      useNativeDriver: true,
    });

    const fadeOut = Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000, // Adjust the duration as desired
      useNativeDriver: true,
    });

    const loopAnimation = () => {
      Animated.sequence([fadeIn, fadeOut]).start(() => loopAnimation());
    };

    loopAnimation();

    return () => {
      // Clean up the animation when the component unmounts
      fadeAnim.stopAnimation();
    };
  }, [fadeAnim]);

  return (
    <Modal animationType="slide" transparent={true}>
      <StatusBar backgroundColor="rgba(0, 0 , 0, 0.7)" />
      <View
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: "rgba(0, 0 , 0, 0.2)",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <Image
            source={images.logo} // Replace with your loading image source
            style={{ width: 150, height: 150 }} // Adjust the size of the loading image as desired
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({});
