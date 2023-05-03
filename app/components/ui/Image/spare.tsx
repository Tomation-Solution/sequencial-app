import React, { useState, useEffect } from "react";
import { View, Image, ActivityIndicator, StyleSheet, Text } from "react-native";

const ImageComponent = ({ imageUrl, defaultImage }: any) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSource, setImageSource] = useState(defaultImage);

  useEffect(() => {
    fetch(imageUrl)
      .then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((imageBlob) => {
        const source = { uri: URL.createObjectURL(imageBlob) };
        setImageSource(source);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setLoading(false);
      });
  }, [imageUrl]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading image</Text>
      </View>
    );
  } else {
    return <Image source={imageSource} style={styles.image} />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
});

export default ImageComponent;
