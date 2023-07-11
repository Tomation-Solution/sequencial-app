import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
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

const personal_details_scheama = Yup.object().shape({
  full_name: Yup.string()
    .required("First Name is required")
    .min(3, "First Name should be at least 3 characters"),

  email: Yup.string().required("Email is required").email("Invalid email"),

  phone_number: Yup.string()
    .required("Phone Number is required")
    .min(6, "Phone Number should be at least 6 characters"),
});

const Page1 = ({ navigation, route }: any) => {
  const theme = useContext(themeContext);

  return (
    <View>
      <Container
        navigationComponent={<AuthHeader navigation={navigation} />}
        image={auth_assets.signup_p1}
      >
        <View>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
            }}
          >
            Create Account
          </Text>

          <Formik
            initialValues={{
              full_name: "",

              email: "",
              phone_number: "",
            }}
            onSubmit={(values) => navigation.navigate("page3", { values })}
            validationSchema={personal_details_scheama}
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
                    marginTop: scale(10),
                  }}
                >
                  <Input
                    placeholder="Full Name"
                    onChangeText={handleChange("full_name")}
                    onBlur={handleBlur("full_name")}
                    value={values.full_name}
                  />
                  {errors.full_name && touched.full_name && (
                    <Text
                      style={{
                        color: theme.error,
                        fontSize: scale(12),
                      }}
                    >
                      {errors.full_name}
                    </Text>
                  )}

                  <Input
                    keyboardType="phone-pad"
                    placeholder="Phone Number"
                    onChangeText={handleChange("phone_number")}
                    onBlur={handleBlur("phone_number")}
                    value={values.phone_number}
                  />
                  {errors.phone_number && touched.phone_number && (
                    <Text
                      style={{
                        color: theme.error,
                        fontSize: scale(12),
                      }}
                    >
                      {errors.phone_number}
                    </Text>
                  )}

                  <Input
                    keyboardType="email-address"
                    placeholder="Email Address"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <Text
                      style={{
                        color: theme.error,
                        fontSize: scale(12),
                      }}
                    >
                      {errors.email}
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

                <Seperator height={20} />
                <Pressable onPress={() => navigation.navigate("signin")}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: scale(14),
                      color: theme.text,
                    }}
                  >
                    Already have an account?{" "}
                    <Text
                      style={{
                        fontSize: scale(14),
                        color: theme.primary,
                      }}
                    >
                      Sign In
                    </Text>
                  </Text>
                </Pressable>
                <Seperator height={20} />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Pressable
                    onPress={() => console.log("Sign in with google")}
                    style={{}}
                  >
                    <Ionicons
                      color={theme.secondary}
                      name="logo-google"
                      size={scale(30)}
                    />
                  </Pressable>
                  <Pressable onPress={() => console.log("Sign in with google")}>
                    <Ionicons
                      color={theme.secondary}
                      name="logo-linkedin"
                      size={scale(30)}
                    />
                  </Pressable>
                  <Pressable onPress={() => console.log("Sign in with google")}>
                    <Ionicons
                      color={theme.secondary}
                      name="logo-apple"
                      size={scale(30)}
                    />
                  </Pressable>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </Container>
    </View>
  );
};

export default Page1;

const styles = StyleSheet.create({});
