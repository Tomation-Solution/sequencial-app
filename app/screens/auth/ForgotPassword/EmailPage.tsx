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

const email_page_sheama = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
});

const SignIn = ({ navigation }: { navigation: any }) => {
  const theme = useContext(themeContext);

  return (
    <View>
      <Container
        navigationComponent={<AuthHeader navigation={navigation} />}
        image={auth_assets.pwr_email_page}
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
            initialValues={{ email: "" }}
            onSubmit={(values) => navigation.navigate("resetPage", { values })}
            validationSchema={email_page_sheama}
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
