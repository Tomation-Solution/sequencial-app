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

const confirm_password = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password should be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Field is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

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
