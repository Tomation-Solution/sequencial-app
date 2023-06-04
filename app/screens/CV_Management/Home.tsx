import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
} from "react";
import { HeaderContext } from "../../providers/context/header";
import {
  Button,
  CustomSelectInput,
  ImageComponent,
  CustomInput as Input,
  Text,
} from "../../components/ui";
import { scale } from "react-native-size-matters";
import themeContext from "../../config/theme/themeContext";
import { AntDesign } from "@expo/vector-icons";
import { Seperator } from "../../components/ui/_helpers";
import C_BS_View from "../../components/ui/BottomDrawers/C_BS_View";
import C_BS_Backdrop from "../../components/ui/BottomDrawers/C_BS_Backdrop";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { data } from "../../../dummyDatas/dropDown";
import { Ionicons } from "@expo/vector-icons";
import { retrieveAppData } from "../../helper_functions/storingAppData";
import * as DocumentPicker from "expo-document-picker";

const Home = ({ navigation }: { navigation: any }) => {
  const educationRef = useRef<ScrollView>(null);
  const workExperienceRef = useRef<ScrollView>(null);
  const certificationRef = useRef<ScrollView>(null);
  const referenceRef = useRef<ScrollView>(null);

  const [userDetails, setUserDetails] = React.useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    state: "",
    country_of_residence: "",
    linkdin: "",
    twitter: "",
    personal_statement: "",
  });

  const [cv, setCv] = React.useState({
    name: "",
    uri: "",
    type: "",
  });

  const [profileImage, setProfileImage] = React.useState({
    name: "",
    uri: "",
    type: "",
  });

  const [education, setEducation] = React.useState([
    {
      id: 1,
      school: "",
      degree: "",
      courseOfStudy: "",
      startYear: "",
      endYear: "",
    },
  ]);

  const [workExperience, setWorkExperience] = React.useState([
    {
      id: 1,
      company: "",
      position: "",
      startYear: "",
      endYear: "",
      role: "",
      responsibilities: "",
    },
  ]);

  const [certifications, setCertifications] = React.useState([
    {
      id: 1,
      certificate: "",
      year: "",
      issuer: "",
    },
  ]);

  const [references, setReferences] = React.useState([
    {
      id: 1,
      fullName: "",
      relationship: "",
      email: "",
      phoneNumber: "",
    },
  ]);

  const handleEducationChange = (text: string, name: string, id: number) => {
    const newEducation = education.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [name]: text,
        };
      }
      return item;
    });
    setEducation(newEducation);
  };

  const handleCertificationsChange = (
    text: string,
    name: string,
    id: number
  ) => {
    const newCertifications = certifications.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [name]: text,
        };
      }
      return item;
    });
    setCertifications(newCertifications);
  };

  const handleReferencesChange = (text: string, name: string, id: number) => {
    const newReferences = references.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [name]: text,
        };
      }
      return item;
    });
    setReferences(newReferences);
  };

  const handleWorkExperienceChange = (
    text: string,
    name: string,
    id: number
  ) => {
    const newWorkExperience = workExperience.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [name]: text,
        };
      }
      return item;
    });

    setWorkExperience(newWorkExperience);
  };

  const handleAddEducation = () => {
    const newEducation = {
      id: education.length + 1,
      school: "",
      degree: "",
      courseOfStudy: "",
      startYear: "",
      endYear: "",
    };
    setEducation([...education, newEducation]);
    if (educationRef.current) {
      educationRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleAddCertification = () => {
    const newCertification = {
      id: certifications.length + 1,
      certificate: "",
      year: "",
      issuer: "",
    };
    setCertifications([...certifications, newCertification]);

    if (certificationRef.current) {
      certificationRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleAddWorkExperience = () => {
    const newWorkExperience = {
      id: workExperience.length + 1,
      company: "",
      position: "",
      startYear: "",
      endYear: "",
      role: "",
      responsibilities: "",
    };
    setWorkExperience([...workExperience, newWorkExperience]);

    if (workExperienceRef.current) {
      workExperienceRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleAddReference = () => {
    const newReference = {
      id: references.length + 1,
      fullName: "",
      relationship: "",
      email: "",
      phoneNumber: "",
    };

    setReferences([...references, newReference]);

    if (referenceRef.current) {
      referenceRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleFormChange = (value: any, name: string) => {
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
    console.log(userDetails);
  };

  const handleDocumentSelection = useCallback(
    async (name: string, type?: string) => {
      let result = await DocumentPicker.getDocumentAsync({
        type: type === "image" ? "image/*" : "application/pdf",
      });
      if (result.type === "success") {
        if (name === "profile_image") {
          setProfileImage({
            name: result.name,
            uri: result.uri,
            type: result.type,
          });
        } else {
          setCv({
            name: result.name,
            uri: result.uri,
            type: result.type,
          });
        }
      }
    },
    []
  );

  const theme = useContext(themeContext);
  const { showHeaderTextHandler } = React.useContext(HeaderContext);

  useFocusEffect(
    React.useCallback(() => {
      showHeaderTextHandler("CV Management");
    }, [])
  );

  useEffect(() => {
    const checkToken = async () => {
      const token = await retrieveAppData("token");
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={{
        backgroundColor: theme.background,
        flex: 1,
      }}
    >
      <>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            padding: scale(10),
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate("Upload CV");
            }}
            style={{
              backgroundColor: theme.placeholder,
              paddingHorizontal: scale(5),
              paddingVertical: scale(7),
              borderRadius: scale(10),
              flexDirection: "row",
              alignSelf: "flex-end",
              marginRight: scale(10),
            }}
          >
            <AntDesign name="upload" size={scale(12)} color={theme.text} />
            <Text
              style={{
                fontSize: scale(12),
                fontWeight: "bold",
                color: theme.text,
                marginLeft: scale(5),
              }}
            >
              Upload Instead
            </Text>
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
            }}
          >
            <ImageComponent
              imageUrl={
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
              }
              style={{
                width: scale(50),
                height: scale(50),
                borderRadius: scale(50),
              }}
            />
          </View>
          {/* input fields  */}
          <View>
            <View>
              <Text>Presonal Statement</Text>
              <TextInput
                numberOfLines={5}
                multiline={true}
                style={{
                  padding: scale(7),
                  borderRadius: scale(10),
                  borderWidth: scale(1),
                  borderColor: theme.placeholder,
                  marginTop: scale(10),
                  textAlignVertical: "top",
                  fontSize: scale(14),
                }}
                onChangeText={(text: string) =>
                  handleFormChange(text, "personal_statement")
                }
              />
            </View>
            <Seperator height={scale(20)} />
            {/* <CustomSelectInput onChange={() => {}} data={data} /> */}
            <Input
              label="First Name"
              placeholder="First Name"
              onChangeText={(text: string) =>
                handleFormChange(text, "first_name")
              }
            />
            <Input
              label="Last Name"
              placeholder="Last Name"
              onChangeText={(text: string) =>
                handleFormChange(text, "last_name")
              }
            />
            <Input
              label="Email"
              placeholder="Email"
              onChangeText={(text: string) => handleFormChange(text, "email")}
            />
            <Input
              label="Phone Number"
              placeholder="Phone Number"
              onChangeText={(text: string) =>
                handleFormChange(text, "phone_number")
              }
            />
            <Input
              label="Address"
              placeholder="Address"
              onChangeText={(text: string) => handleFormChange(text, "address")}
            />
            <Input
              label="City"
              placeholder="City"
              onChangeText={(text: string) => handleFormChange(text, "city")}
            />
            <Input
              label="Post Code"
              placeholder="Post Code"
              onChangeText={(text: string) => handleFormChange(text, "email")}
            />
            <Input
              label="Country"
              placeholder="Country"
              onChangeText={(text: string) =>
                handleFormChange(text, "country_of_residence")
              }
            />

            <Input
              label="Linkdin"
              placeholder="Linkdin"
              onChangeText={(text: string) => handleFormChange(text, "linkdin")}
            />

            <Input
              label="Twitter"
              placeholder="Twitter"
              onChangeText={(text: string) => handleFormChange(text, "twitter")}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: scale(10),
              }}
            >
              <Pressable
                onPress={() =>
                  handleDocumentSelection("profile_image", "image")
                }
                style={{
                  backgroundColor:
                    profileImage !== null ? theme.primary : theme.placeholder,
                  paddingHorizontal: scale(5),
                  paddingVertical: scale(7),
                  borderRadius: scale(10),
                  flex: 1,
                  marginLeft: scale(5),
                }}
              >
                <Text
                  style={{
                    fontSize: scale(14),
                    textAlign: "center",
                  }}
                >
                  {profileImage.name ? profileImage?.name : "Profile Image"}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => handleDocumentSelection("cv", "application/pdf")}
                style={{
                  backgroundColor:
                    cv !== null ? theme.primary : theme.placeholder,
                  paddingHorizontal: scale(5),
                  paddingVertical: scale(7),
                  borderRadius: scale(10),
                  flex: 1,
                  marginLeft: scale(5),
                }}
              >
                <Text
                  style={{
                    fontSize: scale(14),
                    textAlign: "center",
                  }}
                >
                  {cv.name ? cv?.name : "CV"}
                </Text>
              </Pressable>
            </View>
          </View>
          {/* // Education */}
          <View
            style={{
              marginBottom: scale(20),
            }}
          >
            <Seperator height={scale(20)} />
            <Text
              style={{
                fontSize: scale(16),
                fontWeight: "bold",
                marginBottom: scale(10),
              }}
            >
              Education
            </Text>
            <ScrollView horizontal style={{ flex: 1 }} ref={educationRef}>
              {education.map((item) => {
                const _id = item.id;

                return (
                  <View
                    style={{
                      marginLeft: scale(10),
                      backgroundColor: _id % 2 !== 0 ? theme.placeholder : "",
                      borderColor: theme.placeholder,
                      borderWidth: _id % 2 === 0 ? StyleSheet.hairlineWidth : 0,
                      padding: scale(10),
                      borderRadius: scale(10),
                      marginBottom: scale(10),
                      width: scale(270),
                    }}
                    key={_id}
                  >
                    <Input
                      // label="School"
                      placeholder="School"
                      onChangeText={(text: string) =>
                        handleEducationChange(text, "school", _id)
                      }
                    />
                    <Input
                      // label="Start Year"
                      placeholder="Start Year"
                      onChangeText={(text: string) =>
                        handleEducationChange(text, "startYear", _id)
                      }
                      keyboardType="numeric"
                    />

                    <Input
                      // label="End Year"
                      placeholder="End Year"
                      onChangeText={(text: string) =>
                        handleEducationChange(text, "endYear", _id)
                      }
                      keyboardType="numeric"
                    />

                    <CustomSelectInput
                      // label="Course Of Study"
                      onChange={(item: { label: string; value: string }) =>
                        handleEducationChange(item.value, "courseOfStudy", _id)
                      }
                      data={data}
                    />

                    <CustomSelectInput
                      label="Degree"
                      onChange={(item: { label: string; value: string }) =>
                        handleEducationChange(item.value, "degree", _id)
                      }
                      data={data}
                    />
                  </View>
                );
              })}
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={handleAddEducation}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: scale(10),
                }}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={scale(20)}
                  color={theme.text}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* // work experience */}
          <View
            style={{
              marginBottom: scale(20),
            }}
          >
            <Seperator height={scale(20)} />
            <Text
              style={{
                fontSize: scale(16),
                fontWeight: "bold",
                marginBottom: scale(10),
              }}
            >
              Work Experience
            </Text>
            <ScrollView horizontal style={{ flex: 1 }} ref={workExperienceRef}>
              {workExperience.map((item) => {
                const _id = item.id;

                return (
                  <View
                    style={{
                      marginLeft: scale(10),
                      backgroundColor: _id % 2 !== 0 ? theme.placeholder : "",
                      borderColor: theme.placeholder,
                      borderWidth: _id % 2 === 0 ? StyleSheet.hairlineWidth : 0,
                      padding: scale(10),
                      borderRadius: scale(10),
                      marginBottom: scale(10),
                      width: scale(270),
                    }}
                    key={_id}
                  >
                    <Input
                      label="Company"
                      placeholder="Company"
                      onChangeText={(text: string) =>
                        handleWorkExperienceChange(text, "company", _id)
                      }
                    />
                    <Input
                      label="Start Year"
                      placeholder="Start Year"
                      onChangeText={(text: string) =>
                        handleWorkExperienceChange(text, "startYear", _id)
                      }
                      keyboardType="numeric"
                    />

                    <Input
                      label="End Year"
                      placeholder="End Year"
                      onChangeText={(text: string) =>
                        handleWorkExperienceChange(text, "endYear", _id)
                      }
                      keyboardType="numeric"
                    />

                    <Input
                      label="Role"
                      placeholder="Role"
                      onChangeText={(text: string) =>
                        handleWorkExperienceChange(text, "role", _id)
                      }
                      multiline={true}
                      numberOfLines={6}
                      style={{
                        textAlignVertical: "top",
                      }}
                    />

                    <Input
                      label="Responsibilities"
                      placeholder="Responsibilities"
                      onChangeText={(text: string) =>
                        handleWorkExperienceChange(
                          text,
                          "responsibilities",
                          _id
                        )
                      }
                      multiline={true}
                      numberOfLines={6}
                      style={{
                        textAlignVertical: "top",
                      }}
                    />
                  </View>
                );
              })}
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={handleAddWorkExperience}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: scale(10),
                }}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={scale(20)}
                  color={theme.text}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* // Certification */}
          <View
            style={{
              marginBottom: scale(20),
            }}
          >
            <Seperator height={scale(20)} />
            <Text
              style={{
                fontSize: scale(16),
                fontWeight: "bold",
                marginBottom: scale(10),
              }}
            >
              Certification
            </Text>
            <ScrollView horizontal style={{ flex: 1 }} ref={certificationRef}>
              {certifications.map((item) => {
                const _id = item.id;

                return (
                  <View
                    style={{
                      marginLeft: scale(10),
                      backgroundColor: _id % 2 !== 0 ? theme.placeholder : "",
                      borderColor: theme.placeholder,
                      borderWidth: _id % 2 === 0 ? StyleSheet.hairlineWidth : 0,
                      padding: scale(10),
                      borderRadius: scale(10),
                      marginBottom: scale(10),
                      width: scale(270),
                    }}
                    key={_id}
                  >
                    <Input
                      label="Certificate"
                      placeholder="Certificate"
                      onChangeText={(text: string) =>
                        handleCertificationsChange(text, "certificate", _id)
                      }
                    />
                    <Input
                      label="Year"
                      placeholder="Year"
                      onChangeText={(text: string) =>
                        handleCertificationsChange(text, "year", _id)
                      }
                      keyboardType="numeric"
                    />

                    <Input
                      label="Issuer"
                      placeholder="Issuer"
                      onChangeText={(text: string) =>
                        handleCertificationsChange(text, "issuer", _id)
                      }
                    />
                  </View>
                );
              })}
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={handleAddCertification}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: scale(10),
                }}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={scale(20)}
                  color={theme.text}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* // Certification */}
          <View
            style={{
              marginBottom: scale(20),
            }}
          >
            <Seperator height={scale(20)} />
            <Text
              style={{
                fontSize: scale(16),
                fontWeight: "bold",
                marginBottom: scale(10),
              }}
            >
              References
            </Text>
            <ScrollView horizontal style={{ flex: 1 }} ref={referenceRef}>
              {references.map((item) => {
                const _id = item.id;

                return (
                  <View
                    style={{
                      marginLeft: scale(10),
                      backgroundColor: _id % 2 !== 0 ? theme.placeholder : "",
                      borderColor: theme.placeholder,
                      borderWidth: _id % 2 === 0 ? StyleSheet.hairlineWidth : 0,
                      padding: scale(10),
                      borderRadius: scale(10),
                      marginBottom: scale(10),
                      width: scale(270),
                    }}
                    key={_id}
                  >
                    <Input
                      label="Reference Name"
                      placeholder="Reference Name"
                      onChangeText={(text: string) =>
                        handleReferencesChange(text, "fullName", _id)
                      }
                    />

                    <Input
                      label="Relationship"
                      placeholder="Relationship"
                      onChangeText={(text: string) =>
                        handleReferencesChange(text, "relationship", _id)
                      }
                    />

                    <Input
                      label="Reference Email"
                      placeholder="Reference Email"
                      onChangeText={(text: string) =>
                        handleReferencesChange(text, "email", _id)
                      }
                    />

                    <Input
                      label="Phone Number"
                      placeholder="Phone Number"
                      onChangeText={(text: string) =>
                        handleReferencesChange(text, "phoneNumber", _id)
                      }
                    />
                  </View>
                );
              })}
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                onPress={handleAddReference}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: scale(10),
                }}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={scale(20)}
                  color={theme.text}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Button
            onPress={() => {
              console.log("dsjfjsdf");
            }}
          >
            Save
          </Button>
          <Seperator height={scale(20)} />
        </ScrollView>
      </>
    </KeyboardAvoidingView>
  );
  <Button
    onPress={() => {
      console.log("dsjfjsdf");
    }}
  >
    psjfposjf
  </Button>;
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 8,
  },
  label: {
    marginBottom: 4,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
  },
  dropdownContainer: {
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 8,
  },
  dropdownOption: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 4,
  },
});
