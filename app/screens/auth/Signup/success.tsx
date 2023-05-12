import { Pressable, StyleSheet, View } from "react-native";
import React, { useContext } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
import { scale } from "react-native-size-matters";
import themeContext from "../../../config/theme/themeContext";
import Container from "../Container";
import { auth_assets } from "../assets";
import { Button, Input, Text } from "../../../components/ui";
import { Seperator } from "../../../components/ui/_helpers";
import AuthHeader from "../../../components/app/Header/AuthHeader";

const Success = ({ navigation, route }: any) => {
  const theme = useContext(themeContext);

  const { newValues } = route.params;

  console.log(newValues);

  return (
    <View>
      <Container
        navigationComponent={<AuthHeader navigation={navigation} />}
        image={auth_assets.success}
      >
        <View>
          <Text
            style={{
              fontSize: scale(30),
              textAlign: "center",
            }}
          >
            Success
          </Text>
          <Seperator height={30} />

          <Text
            style={{
              fontSize: scale(14),
              textAlign: "center",
            }}
          >
            Account Created
          </Text>
          <Seperator height={30} />
          <Button
            styles={{
              paddingVertical: scale(13),
            }}
            onPress={() => navigation.navigate("signin")}
          >
            Procced to Login
          </Button>
        </View>
      </Container>
    </View>
  );
};

export default Success;

const styles = StyleSheet.create({});
