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

const personal_details_scheama = Yup.object().shape({
  education_level: Yup.string()
    .required("Field is required")
    .min(5, "Field should be at least 5 characters"),

  profession: Yup.string()
    .required("Field is required")
    .min(5, "Field should be at least 5 characters"),
});

const Page2 = ({ navigation, route }: any) => {
  const theme = useContext(themeContext);
  const { values } = route.params;
  const previousValues = values;

  console.log(previousValues);

  return (
    <View>
      <Container
        navigationComponent={<AuthHeader navigation={navigation} />}
        image={auth_assets.signup_p2}
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
              education_level: "",
              profession: "",
            }}
            onSubmit={(values) => {
              let newValues = {
                ...previousValues,
                ...values,
              };
              navigation.navigate("page3", { newValues });
            }}
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
                    marginTop: scale(20),
                  }}
                >
                  <Input
                    placeholder="Educational Level"
                    onChangeText={handleChange("education_level")}
                    onBlur={handleBlur("education_level")}
                    value={values.education_level}
                  />
                  {errors.education_level && touched.education_level && (
                    <Text
                      style={{
                        color: theme.error,
                        fontSize: scale(12),
                      }}
                    >
                      {errors.education_level}
                    </Text>
                  )}

                  <Input
                    placeholder="Profession"
                    onChangeText={handleChange("profession")}
                    onBlur={handleBlur("profession")}
                    value={values.profession}
                  />
                  {errors.profession && touched.profession && (
                    <Text
                      style={{
                        color: theme.error,
                        fontSize: scale(12),
                      }}
                    >
                      {errors.profession}
                    </Text>
                  )}

                  <Seperator height={20} />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      styles={{
                        paddingVertical: scale(13),
                        backgroundColor: "transparent",
                        borderWidth: 1,
                        borderColor: theme.primary,
                        flex: 1,
                      }}
                      textStyles={{
                        color: theme.primary,
                      }}
                      onPress={() => navigation.goBack()}
                      disabled={!isValid}
                    >
                      Previous
                    </Button>
                    <Seperator width={20} />
                    <Button
                      styles={{
                        paddingVertical: scale(13),
                        flex: 1,
                      }}
                      onPress={() => handleSubmit()}
                      disabled={!isValid}
                    >
                      Continue
                    </Button>
                  </View>
                </View>

                <Seperator height={40} />
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

export default Page2;

const styles = StyleSheet.create({});
