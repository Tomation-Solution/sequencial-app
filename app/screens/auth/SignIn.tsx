import { Image, Pressable, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import AuthHeader from "../../components/app/Header/AuthHeader";
import { images } from "../../assets";
import { scale } from "react-native-size-matters";
import { Button, Input, Text } from "../../components/ui";
import themeContext from "../../config/theme/themeContext";
import { Formik } from "formik";
import * as Yup from "yup";
import { Seperator } from "../../components/ui/_helpers";
import { Ionicons } from "@expo/vector-icons";

const SignInSchema = Yup.object().shape({
  phone: Yup.string()
    .required("Phone number is required")
    .min(10, "Phone number should be at least 10 characters")
    .max(11, "Phone number should be at most 11 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password should be at least 6 characters"),
});

const SignIn = ({ navigation }: { navigation: any }) => {
  const theme = useContext(themeContext);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Formik
        initialValues={{ phone: "", password: "" }}
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
              flex: 1,
              width: "100%",
              marginTop: scale(40),
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                paddingHorizontal: scale(16),
                height: scale(42),
                marginTop: scale(35),
                marginBottom: scale(50),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={images.logo}
                style={{ width: scale(160), height: scale(80) }}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: scale(20),
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text
                style={{
                  color: theme.success,
                  fontWeight: "bold",
                  fontSize: scale(20),
                }}
              >
                Get Started
              </Text>

              <Button onPress={() => navigation.navigate("signup")}>
                Create an account
              </Button>
            </View>

            <View
              style={{
                marginTop: scale(20),
                paddingHorizontal: scale(20),
              }}
            >
              <Input
                label="Phone Number"
                placeholder="Enter your phone number"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                keyboardType="phone-pad"
              />
              {errors.phone && touched.phone && (
                <Text
                  style={{
                    color: theme.error,
                    fontSize: scale(12),
                  }}
                >
                  {errors.phone}
                </Text>
              )}

              <Input
                label="Password"
                secureTextEntry={true}
                placeholder="Enter your password"
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
              <Seperator height={scale(20)} />
              <Button onPress={() => handleSubmit()} disabled={!isValid}>
                Sign In
              </Button>

              <Seperator height={scale(20)} />
              <Pressable onPress={() => navigation.navigate("forgotpassword")}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: scale(14),
                    color: "#0000004D",
                  }}
                >
                  Forgot Password?
                </Text>
              </Pressable>
            </View>

            <View>
              <Seperator height={scale(20)} />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: scale(14),
                  color: "#0000004D",
                }}
              >
                Or Sign In with
              </Text>
              <Seperator height={scale(20)} />
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
                  style={{
                    width: scale(50),
                    height: scale(50),
                    borderRadius: scale(25),
                    backgroundColor: "#0000004D",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="logo-google" size={scale(30)} />
                </Pressable>
                <Pressable
                  onPress={() => console.log("Sign in with google")}
                  style={{
                    width: scale(50),
                    height: scale(50),
                    borderRadius: scale(25),
                    backgroundColor: "#0000004D",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="logo-linkedin" size={scale(30)} />
                </Pressable>
                <Pressable
                  onPress={() => console.log("Sign in with google")}
                  style={{
                    width: scale(50),
                    height: scale(50),
                    borderRadius: scale(25),
                    backgroundColor: "#0000004D",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="logo-apple" size={scale(30)} />
                </Pressable>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
