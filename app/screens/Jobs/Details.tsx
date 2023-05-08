import { Pressable, StyleSheet, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { HeaderContext } from "../../providers/context/header";
import { Button, ImageComponent, Text } from "../../components/ui";
import themeContext from "../../config/theme/themeContext";
import { useFocusEffect } from "@react-navigation/native";
import { placeholders } from "../../assets/placeholders";
import { scale } from "react-native-size-matters";
import { Seperator } from "../../components/ui/_helpers";
import { ScrollView } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import JobDetails from "./JobDetails";
import Apply from "./Apply";

type Props = {
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: string;
  salary: string;
  canApplyFromPhone: boolean;
  isHiringMultiple: boolean;
  whenPosted: string;
  image: string;
  navigation: any;
};

const Details = ({ navigation }: any) => {
  const { showBackButtonHandler } = React.useContext(HeaderContext);
  const [showDetails, setShowDetails] = React.useState(false);
  const theme = useContext(themeContext);

  useFocusEffect(
    React.useCallback(() => {
      showBackButtonHandler();
    }, [])
  );

  return (
    <ScrollView
      style={{
        paddingHorizontal: scale(10),
        backgroundColor: theme.background,
        flex: 1,
      }}
    >
      <View
        style={{
          paddingBottom: scale(70),
        }}
      >
        <View
          style={{
            marginTop: scale(20),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <View
              style={{
                borderRadius: scale(30),
                overflow: "hidden",
                backgroundColor: theme.placeholder,
              }}
            >
              <ImageComponent
                imageUrl={placeholders.company}
                onDevice
                style={{
                  width: scale(60),
                  height: scale(60),
                }}
              />
            </View>
            <Seperator height={scale(6)} />
            <Text
              style={{
                fontSize: scale(16),
                fontWeight: "bold",
              }}
            >
              Business Developer
            </Text>
          </View>
        </View>
        <Seperator height={scale(15)} />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Text>Google</Text>
          <View
            style={{
              height: scale(8),
              width: scale(8),
              borderRadius: scale(4),
              backgroundColor: theme.placeholder,
            }}
          />
          <Text>California</Text>
          <View
            style={{
              height: scale(8),
              width: scale(8),
              borderRadius: scale(4),
              backgroundColor: theme.placeholder,
            }}
          />
          <Text>1 day(s)</Text>
        </View>

        <Seperator height={scale(30)} />

        {!showDetails ? (
          <JobDetails setShowDetails={setShowDetails} />
        ) : (
          <Apply />
        )}
      </View>
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({});
