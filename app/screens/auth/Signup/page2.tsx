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
  courseOfStudy: Yup.string()
    .required("This field is required")
    .min(3, "Should be at least 3 characters"),
  profession: Yup.string()
    .required("This field is required")
    .min(3, "Should be at least 3 characters"),
});

const Page2 = ({ navigation }: { navigation: any }) => {
  const theme = useContext(themeContext);

  return (
    <Formik
      initialValues={{ courseOfStudy: "", profession: "" }}
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
                Educational Information
              </Text>
            </View>

            <View
              style={{
                marginTop: scale(20),
                paddingHorizontal: scale(20),
              }}
            >
              <Input
                label="Course of Study"
                placeholder="Enter Course of Study"
                onChangeText={handleChange("courseOfStudy")}
                onBlur={handleBlur("courseOfStudy")}
                value={values.courseOfStudy}
              />
              {errors.courseOfStudy && touched.courseOfStudy && (
                <Text
                  style={{
                    color: theme.error,
                    fontSize: scale(12),
                  }}
                >
                  {errors.courseOfStudy}
                </Text>
              )}

              <Input
                label="Profession"
                placeholder="Enter your Profession"
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
                  onPress={() => navigation.navigate("page1")}
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
                  onPress={() => navigation.navigate("page3")}
                  disabled={
                    !values.courseOfStudy || !values.profession || !isValid
                  }
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

export default Page2;

const styles = StyleSheet.create({});
