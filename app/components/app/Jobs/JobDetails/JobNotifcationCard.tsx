import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { ImageComponent, Text } from "../../../ui";
import { scale } from "react-native-size-matters";
import themeContext from "../../../../config/theme/themeContext";

type Props = {
  isOpened: boolean;
  image: string;
  company: string;
  role: string;
  type: string;
  navigation: any;
};

const Test = ({ company, role }: any) => {
  return (
    <Text
      style={{
        fontSize: scale(13),
        textAlign: "justify",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: scale(13),
        }}
      >
        {company}
      </Text>{" "}
      has invited you you take the test for{" "}
      <Text
        style={{
          fontWeight: "bold",
          fontSize: scale(13),
        }}
      >
        {role}
      </Text>{" "}
      role
    </Text>
  );
};

const Interview = ({ company, role }: any) => {
  return (
    <Text
      style={{
        fontSize: scale(13),
        textAlign: "justify",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: scale(13),
        }}
      >
        {company}
      </Text>{" "}
      has SCHEDULED you FOR AN INTERVIEW FOR{" "}
      <Text
        style={{
          fontWeight: "bold",
          fontSize: scale(13),
        }}
      >
        {role}
      </Text>{" "}
      role
    </Text>
  );
};

const Offer = ({ company, role }: any) => {
  return (
    <Text
      style={{
        fontSize: scale(13),
        textAlign: "justify",
      }}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: scale(13),
        }}
      >
        {company}
      </Text>{" "}
      has hired you for{" "}
      <Text
        style={{
          fontWeight: "bold",
          fontSize: scale(13),
        }}
      >
        {role}
      </Text>{" "}
      role
    </Text>
  );
};
const JobNotifcationCard: React.FC<Props> = ({
  isOpened,
  image,
  company,
  role,
  type,
  navigation,
}) => {
  const theme = useContext(themeContext);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        paddingVertical: scale(10),
        borderBottomColor: theme.disabled,
        borderBottomWidth: 1,
        position: "relative",
        paddingRight: scale(40),
      }}
    >
      {!isOpened && (
        <View
          style={{
            width: scale(7),
            height: scale(7),
            backgroundColor: "#90CDF4",
            borderColor: "#4299E1",
            borderWidth: scale(1),
            borderRadius: 10,
          }}
        />
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <View
          style={{
            width: scale(28),
            height: scale(28),
            borderRadius: scale(20),
            backgroundColor: theme.disabled,
            justifyContent: "center",
            alignItems: "center",
            marginRight: scale(8),
            overflow: "hidden",
            opacity: 0.8,
          }}
        >
          <ImageComponent
            imageUrl={image}
            style={{ width: scale(28), height: scale(28) }}
          />
        </View>
        {type === "test" && <Test company={company} role={role} />}
        {type === "interview" && <Interview company={company} role={role} />}
        {type === "offer" && <Offer company={company} role={role} />}
      </View>
    </TouchableOpacity>
  );
};

export default JobNotifcationCard;

const styles = StyleSheet.create({});
