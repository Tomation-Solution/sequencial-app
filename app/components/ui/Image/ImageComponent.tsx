import React, { useContext, useEffect, useState } from "react";
import { ImageStyle } from "react-native";
import { View, Image, ActivityIndicator } from "react-native";
import themeContext from "../../../config/theme/themeContext";
import { Text } from "react-native";
import { scale } from "react-native-size-matters";

const defaultImageUrl =
  "https://www.google.com/url?sa=i&url=http%3A%2F%2Fedenchristianacademy.co.nz%2Fdummy-image-square%2F&psig=AOvVaw1R_gJEgzyUCTbwfEJXOzNw&ust=1683125023808000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCMDvxs7v1v4CFQAAAAAdAAAAABAE";

type Props = {
  imageUrl: string;
  style: ImageStyle;
};

const ImageComponent: React.FC<Props> = ({ imageUrl, style }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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
        style={{ ...style }}
        source={{ uri: imageUrl }}
        // onLoadStart={() => setLoading(true)}
        // onLoadEnd={() => setLoading(false)}
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
