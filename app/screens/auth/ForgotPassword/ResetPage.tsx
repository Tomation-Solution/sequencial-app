import { Pressable, StyleSheet, View } from "react-native";
import React, { useContext } from "react";

import * as Yup from "yup";
import { Formik } from "formik";
import { scale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
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

const SignIn = ({ navigation, route }: any) => {
  const theme = useContext(themeContext);

  const { values } = route.params;

  return (
    <View>
      <Container
        navigationComponent={<AuthHeader navigation={navigation} />}
        image={auth_assets.pwr_reset_page}
      >
        <View>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
            }}
          >
            Change Password
          </Text>

          <Formik
            initialValues={{ password: "", confirmPassword: "" }}
            onSubmit={(values) => console.log(values)}
            validationSchema={confirm_password}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
              <View
                style={{
                  // flex: 1,
                  width: "100%",
                }}
              >
                <View
                  style={{
                    marginTop: scale(20),
                  }}
                >
                  <Input
                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  {errors.password && touched.password && (
                    <Text
                      style={{
                        color: theme.error,
                        fontSize: scale(12),
                      }}
                    >
                      {errors.password}
                    </Text>
                  )}
                  <Input
                    secureTextEntry={true}
                    placeholder="Confirm Password"
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text
                      style={{
                        color: theme.error,
                        fontSize: scale(12),
                      }}
                    >
                      {errors.confirmPassword}
                    </Text>
                  )}

                  <Seperator height={20} />
                  <Button
                    styles={{
                      paddingVertical: scale(13),
                    }}
                    onPress={() => handleSubmit()}
                    disabled={!isValid}
                  >
                    Continue
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </Container>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
