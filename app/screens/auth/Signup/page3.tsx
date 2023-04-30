import { Image, Pressable, StyleSheet, View } from "react-native";
import React, { useContext } from "react";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import themeContext from "../../../config/theme/themeContext";
import { Formik } from "formik";
import AuthHeader from "../../../components/app/Header/AuthHeader";
import { scale } from "react-native-size-matters";
import { Button, Input, Text } from "../../../components/ui";
import { Seperator } from "../../../components/ui/_helpers";

const page2Scheama = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Email is invalid"),

  phone: Yup.string()
    .required("Phone number is required")
    .min(10, "Phone number should be at least 10 characters")
    .max(11, "Phone number should be at most 11 characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password should be at least 6 characters"),
});

const Page3 = ({ navigation }: { navigation: any }) => {
  const theme = useContext(themeContext);

  return (
    <Formik
      initialValues={{ email: "", phone: "", password: "" }}
      onSubmit={(values) => console.log(values)}
      validationSchema={page2Scheama}
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
            alignItems: "center",
            backgroundColor: "#fff",
          }}
        >
          <AuthHeader navigation={navigation} />

          <Text
            style={{
              fontSize: scale(35),
              fontWeight: "bold",
              color: theme.text,
              marginTop: scale(10),
            }}
          >
            Sign Up
          </Text>
          <Text
            style={{
              fontSize: scale(20),
              color: theme.text,
            }}
          >
            Applicant
          </Text>

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
                marginLeft: scale(20),
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
                Contact Information
              </Text>
            </View>

            <View
              style={{
                marginTop: scale(20),
                paddingHorizontal: scale(20),
              }}
            >
              <Input
                label="Email"
                placeholder="Enter Email"
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

              <Input
                label="Phone Number"
                placeholder="Enter your Phone number"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
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

              <Seperator height={scale(30)} />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Pressable
                  style={{
                    borderBottomColor: "#0000004D",
                    borderBottomWidth: 1,
                  }}
                  onPress={() => navigation.navigate("page2")}
                >
                  <Text
                    style={{
                      fontSize: scale(14),
                      color: "#0000004D",
                    }}
                  >
                    Previous
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => navigation.navigate("otp")}
                  disabled={!values.email || !values.phone || !isValid}
                  style={{
                    borderBottomColor: isValid ? theme.success : "#0000004D",
                    borderBottomWidth: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: scale(16),
                      color: isValid ? theme.success : "#0000004D",
                    }}
                  >
                    Next
                  </Text>
                </Pressable>
              </View>
            </View>

            <View>
              <Seperator height={scale(40)} />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: scale(14),
                  color: "#0000004D",
                }}
              >
                Or Sign Up with
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
        </View>
      )}
    </Formik>
  );
};

export default Page3;

const styles = StyleSheet.create({});
