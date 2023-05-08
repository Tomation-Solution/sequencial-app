import React, { useContext, useEffect, useState } from "react";
import { ImageStyle } from "react-native";
import { View, Image, ActivityIndicator } from "react-native";
import themeContext from "../../../config/theme/themeContext";
import { Text } from "react-native";
import { scale } from "react-native-size-matters";

const defaultImageUrl =
  "http://edenchristianacademy.co.nz/wp-content/uploads/2013/11/dummy-image-square-768x768.jpg";

type Props = {
  imageUrl: any;
  style: ImageStyle;
  onDevice?: boolean;
};

const ImageComponent: React.FC<Props> = ({ imageUrl, style, onDevice }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLoadEnd = () => {
    setLoading(false);
  };

  const [imageSource, setImageSource] = useState<any>(defaultImageUrl);

  const theme = useContext(themeContext);

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  } else if (error) {
    return (
      <Text
        style={{
          fontSize: scale(8),
        }}
      >
        Error loading image
      </Text>
    );
  } else {
    return (
      <Image
        style={[{ ...style }]}
        source={onDevice ? imageUrl : { uri: imageUrl }}
        loadingIndicatorSource={{
          uri: defaultImageUrl,
        }}
        // onLoadStart={() => setLoading(true)}
        // onLoadEnd={onLoadEnd}
        // onError={handleError}
      />
    );
  }
};

//   return (
//     <View>
//       {isLoading && <ActivityIndicator size="large" color={theme.text} />}
//       {!isLoading && error && (
//         <Image
//           style={{ width: 100, height: 100 }}
//           source={{ uri: defaultImageUrl }}
//         />
//       )}
//       {!isLoading && !error && (
//         <Image
//           style={{ ...style }}
//           source={{ uri: imageUrl }}
//           onLoad={handleLoad}
//           onError={handleError}
//         />
//       )}
//     </View>
//   );

export default ImageComponent;
