import { Pressable, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import Container from "./Container";
import { auth_assets } from "./assets";
import { Button, Input, Text } from "../../components/ui";
import * as Yup from "yup";
import { Formik } from "formik";
import { scale } from "react-native-size-matters";
import themeContext from "../../config/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { Seperator } from "../../components/ui/_helpers";

const SignInSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password should be at least 6 characters"),
});

const SignIn = ({ navigation }: { navigation: any }) => {
  const theme = useContext(themeContext);

  return (
    <View>
      <Container image={auth_assets.login_pic}>
        <View>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
            }}
          >
            Login
          </Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => console.log(values)}
            validationSchema={SignInSchema}
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
                    placeholder="Email Address"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
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

                  <Seperator height={20} />

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          height: scale(14),
                          width: scale(14),
                          borderRadius: scale(2),
                          borderColor: theme.text,
                          borderWidth: 1,
                          marginRight: scale(7),
                        }}
                      />
                      <Text
                        style={{
                          fontSize: scale(14),
                          color: theme.text,
                        }}
                      >
                        Remember me
                      </Text>
                    </View>
                    <Pressable
                      onPress={() => navigation.navigate("forgotpassword")}
                    >
                      <Text
                        style={{
                          fontSize: scale(14),
                          color: theme.primary,
                        }}
                      >
                        Forgot Password?
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <Seperator height={50} />
                <Pressable onPress={() => navigation.navigate("signup")}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: scale(14),
                      color: theme.text,
                    }}
                  >
                    Dont have an account?{" "}
                    <Text
                      style={{
                        fontSize: scale(14),
                        color: theme.primary,
                      }}
                    >
                      Sign Up
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

export default SignIn;

const styles = StyleSheet.create({});
