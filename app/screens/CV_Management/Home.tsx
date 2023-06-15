import {
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
  useReducer,
  useRef,
} from "react";
import { HeaderContext } from "../../providers/context/header";
import {
  Button,
  ImageComponent,
  CustomInput as Input,
  Text,
} from "../../components/ui";
import { scale } from "react-native-size-matters";
import themeContext from "../../config/theme/themeContext";
import { AntDesign } from "@expo/vector-icons";
import { Seperator } from "../../components/ui/_helpers";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import {
  fetch_user_data,
  update_job_seeker,
} from "../../providers/call-service/cv_";
import ApiContext from "../../providers/context/api";
import { AppContext } from "../../providers/context/app";
import {
  Certification,
  Education,
  Reference,
  UserDetails,
  WorkExperience,
} from "../../../types";
import { KeyboardAvoidingView } from "../../components/ui/customElements";
import Loading from "../../components/ui/_helpers/Loading";
import { retrieveAppData } from "../../helper_functions/storingAppData";
import { State } from "./interfaces";
import { Controller, useForm } from "react-hook-form";
import { convertToTitleCase } from "../../helper_functions/miscs";
import { FlatList } from "react-native-gesture-handler";

const initialState: State = {
  education: [
    // {
    //   id: 1,
    //   school_name: "",
    //   start_year: "",
    //   end_year: "",
    //   course_of_study: "",
    //   degree_type: "",
    // },
  ],
  experience: [],
  certificaton: [],
  refrences: [],
  first_name: "",
  last_name: "",
  middle_name: "",
  email: "",
  phone_number: "",
  address: "",
  city: "",
  state: "",
  country_of_residence: "",
  linkdin: "",
  twitter: "",
  personal_statement: "",
  skills: "",
};

const Home = ({ navigation, route }: { navigation: any; route: any }) => {
  const route_params = route.params;

  const educationRef = useRef<ScrollView>(null);
  const workExperienceRef = useRef<ScrollView>(null);
  const certificationRef = useRef<ScrollView>(null);
  const referenceRef = useRef<ScrollView>(null);

  const theme = useContext(themeContext);
  const { useApiMutation, useApiQuery } = useContext(ApiContext);
  const { showHeaderTextHandler } = React.useContext(HeaderContext);

  const {
    handleSubmit,
    register,
    getValues,
    control,
    setValue,
    formState: { errors },
  } = useForm<State>({
    defaultValues: initialState,
  });

  const handleFormChange = (text: string, name: any) => {
    console.log(getValues("phone_number"));
    setValue(name, text);
  };

  const { data, error, refetch, isSuccess, isLoading } = useApiQuery({
    queryKey: "fetchUserData",
    queryFunction: fetch_user_data,
  });

  const uploadCv = useApiMutation({
    mutationFunction: update_job_seeker,
  });

  useEffect(() => {
    if (isSuccess && data?.data?.user_extra?.job_seakers?.cvStucture) {
      const { cvStucture } = data.data.user_extra.job_seakers;

      const newEducation = cvStucture.education.map((item: Education) => ({
        ...item,
        id: Math.random(),
      }));

      const newExperience = cvStucture.experience.map(
        (item: WorkExperience) => ({
          ...item,
          id: Math.random(),
        })
      );

      const newCertification = cvStucture.certificaton.map(
        (item: Certification) => ({
          ...item,
          id: Math.random(),
        })
      );

      const newReference = cvStucture.refrences.map((item: Reference) => ({
        ...item,
        id: Math.random(),
      }));

      const _data = {
        ...cvStucture,
        education: newEducation,
        experience: newExperience,
        certificaton: newCertification,
        refrences: newReference,
      };

      // console.log("data", _data);

      Object.keys(_data).forEach((field) => {
        setValue(field, _data[field]);
      });

      // Object.keys(cvStucture).forEach((field) => {
      //   setValue(field, cvStucture[field]);
      // });

      // Iterate over the fields and set their values
    }
  }, [isSuccess, data]);

  const handleAddEducation = () => {
    const education = getValues("education") || [];
    const newEducation = [
      ...education,
      {
        id: education.length + 1,
        school_name: "",
        start_year: "",
        end_year: "",
        course_of_study: "",
        degree_type: "",
      },
    ];
    setValue("education", newEducation);
    setTimeout(() => {
      educationRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleAddWorkExperience = () => {
    const workExperience = getValues("experience") || [];
    const newWorkExperience = [
      ...workExperience,
      {
        id: workExperience.length + 1,
        company: "",
        position: "",
        start_year: "",
        end_year: "",
        role: "",
        responsibilities: "",
      },
    ];
    setValue("experience", newWorkExperience);
    setTimeout(() => {
      workExperienceRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleAddCertification = () => {
    const certifications = getValues("certificaton") || [];
    const newCertifications = [
      ...certifications,
      {
        id: certifications.length + 1,
        certification: "",
        year: "",
        issuer: "",
      },
    ];
    setValue("certificaton", newCertifications);
    setTimeout(() => {
      certificationRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleAddReference = () => {
    const references = getValues("refrences") || [];
    const newReferences = [
      ...references,
      {
        id: references.length + 1,
        full_name: "",
        relationship: "",
        email: "",
        phone_number: "",
      },
    ];
    setValue("refrences", newReferences);
    setTimeout(() => {
      referenceRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSave = handleSubmit(async (formData) => {
    // const __data = {
    //   ...formData,
    //   education: JSON.stringify(formData.education),
    //   experience: JSON.stringify(formData.experience),
    //   certificaton: JSON.stringify(formData.certificaton),
    //   refrences: JSON.stringify(formData.refrences),
    // };

    // const _data = new FormData();

    // Object.entries(__data).forEach(([key, value]) => {
    //   _data.append(key, value);
    // });

    // uploadCv.mutate(_data);

    console.log("form data", formData);
  });

  useFocusEffect(
    React.useCallback(() => {
      showHeaderTextHandler("CV Management");
      refetch();
    }, [])
  );

  useEffect(() => {
    if (uploadCv.isSuccess) {
      navigation.goBack();
    }
  }, [uploadCv.isSuccess]);

  return (
    <KeyboardAvoidingView>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          paddingVertical: scale(10),
        }}
      >
        <Pressable
          onPress={() => {
            navigation.navigate("Upload CV");
          }}
          style={[
            styles.uploadCVButton,
            {
              backgroundColor: theme.placeholder,
            },
          ]}
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
            <Text>Personal Statement</Text>

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  numberOfLines={5}
                  placeholder="Personal Statement"
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(text)}
                  multiline={true}
                  value={value}
                  style={{
                    padding: scale(7),
                    borderRadius: scale(10),
                    borderWidth: scale(1),
                    borderColor: theme.placeholder,
                    marginTop: scale(10),
                    textAlignVertical: "top",
                    fontSize: scale(14),
                  }}
                />
              )}
              name="personal_statement"
            />
            {errors.personal_statement && <Text>This is required.</Text>}
          </View>

          {/* map over the rest  */}
          <View>
            {Object.keys(initialState).map((field) => {
              if (
                field === "personal_statement" ||
                field === "education" ||
                field === "experience" ||
                field === "certificaton" ||
                field === "refrences"
              )
                return null;
              return (
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      placeholder={convertToTitleCase(field)}
                      label={convertToTitleCase(field)}
                      onBlur={onBlur}
                      onChangeText={(text) => onChange(text)}
                      value={value}
                      maxLength={field === "phone_number" ? 11 : undefined}
                      keyboardType={
                        field === "phone_number" ? "number-pad" : "default"
                      }
                    />
                  )}
                  name={field}
                />
              );
            })}
          </View>

          <Seperator height={scale(20)} />

          <View>
            <Text>Education</Text>
            <Seperator height={scale(10)} />
            <View>
              <FlatList
                horizontal
                style={{ flex: 1 }}
                ref={educationRef}
                data={getValues("education")}
                keyExtractor={(item: Education) => item.id.toString()}
                renderItem={({ item }: { item: Education }) => (
                  <View
                    style={{
                      marginLeft: scale(10),
                      backgroundColor:
                        item.id % 2 !== 0 ? theme.placeholder : "",
                      borderColor: theme.placeholder,
                      borderWidth:
                        item.id % 2 === 0 ? StyleSheet.hairlineWidth : 0,
                      padding: scale(10),
                      borderRadius: scale(10),
                      marginBottom: scale(10),
                      width: scale(270),
                    }}
                  >
                    {Object.keys(item).map((field, index) => {
                      if (field === "id") return null;
                      return (
                        <Controller
                          control={control}
                          rules={{
                            required: true,
                          }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                              placeholder={convertToTitleCase(field)}
                              label={convertToTitleCase(field)}
                              onBlur={onBlur}
                              onChangeText={(text) => {
                                console.log("text", value);
                                onChange(text);
                              }}
                              value={value}
                              maxLength={
                                field === "phone_number" ? 11 : undefined
                              }
                              keyboardType={
                                field === "phone_number"
                                  ? "number-pad"
                                  : "default"
                              }
                            />
                          )}
                          name={`education[${item.id}].${field}`}
                        />
                      );
                    })}
                  </View>
                )}
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handleAddEducation();
              }}
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

        <Button
          onPress={() => {
            // handleSave();
            console.log(getValues());
          }}
        >
          Save
        </Button>
        <Seperator height={scale(20)} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  uploadCVButton: {
    paddingHorizontal: scale(5),
    paddingVertical: scale(7),
    borderRadius: scale(10),
    flexDirection: "row",
    alignSelf: "flex-end",
    marginRight: scale(10),
  },
});
