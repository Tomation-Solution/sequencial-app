import { Pressable, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import { scale } from "react-native-size-matters";
import themeContext from "../../config/theme/themeContext";
import { Seperator } from "../../components/ui/_helpers";
import { Button, Text } from "../../components/ui";
import { Ionicons, Entypo } from "@expo/vector-icons";
import JobWrapper from "./JobWrapper";

const BulletPoint = ({ children }: any) => {
  const theme = useContext(themeContext);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        marginVertical: scale(2),
        //   justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          height: scale(6),
          width: scale(6),
          borderRadius: scale(4),
          backgroundColor: theme.text,
          marginTop: scale(5),
          marginRight: scale(10),
        }}
      />
      <Text
        style={{
          fontSize: scale(14),
          color: theme.grayText,
        }}
      >
        {children}
      </Text>
    </View>
  );
};

const Details = ({ navigation, route }: { navigation: any; route: any }) => {
  const [showMore, setShowMore] = React.useState(false);
  const theme = useContext(themeContext);

  const { job_id, job_variant } = route.params;

  let text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quia, quos voluptates voLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quia, quos voluptates voLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quia, quos voluptates voLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quia, quos voluptates voLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quia, quos voluptates voLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quia, quos voluptates voLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quia, quos voluptates voLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quia, quos voluptates voluptatibus consequuntur voluptate quod quae doloribus fugit...";
  return (
    <JobWrapper>
      <View
        style={{
          borderColor: theme.placeholder,
          borderWidth: scale(2),
          borderRadius: scale(8),
          padding: scale(12),
          borderStyle: "dashed",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: scale(16),
              fontWeight: "bold",
            }}
          >
            Job Description
          </Text>
          <Pressable>
            <Entypo
              name="share-alternative"
              size={scale(20)}
              color={theme.text}
            />
          </Pressable>
        </View>
        <Seperator height={scale(8)} />
        <Text
          style={{
            lineHeight: scale(23),
            textAlign: "justify",
            color: theme.grayText,
            fontSize: scale(14),
          }}
        >
          {showMore ? text : text.slice(0, 100)}
        </Text>
        <Button
          onPress={() => setShowMore(!showMore)}
          textStyles={{
            color: theme.text,
            fontSize: scale(14),
          }}
          style={{
            marginTop: scale(15),
            backgroundColor: showMore ? theme.placeholder : theme.primary,
            alignSelf: "flex-end",
            paddingHorizontal: scale(14),
            paddingVertical: scale(6),
            borderRadius: scale(8),
          }}
        >
          {showMore ? "Show Less" : "Show More"}
        </Button>

        <Seperator height={scale(10)} />
        <View>
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            Requirements
          </Text>
          <Seperator height={scale(10)} />
          <BulletPoint>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </BulletPoint>
          <BulletPoint>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </BulletPoint>
          <BulletPoint>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </BulletPoint>
          <BulletPoint>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          </BulletPoint>
        </View>

        <View
          style={{
            marginTop: scale(30),
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Pressable>
            <Ionicons
              name="heart-outline"
              size={scale(28)}
              color={theme.text}
            />
          </Pressable>
          <Button
            onPress={() =>
              navigation.navigate("Apply", { job_id, job_variant })
            }
            styles={{
              flex: 1,
              marginLeft: scale(10),
            }}
          >
            APPLY NOW
          </Button>
        </View>
      </View>
    </JobWrapper>
  );
};

export default Details;

const styles = StyleSheet.create({});
