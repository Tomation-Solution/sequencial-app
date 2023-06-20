import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useRef } from "react";
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
import {
  fetch_user_data,
  update_job_seeker,
} from "../../providers/call-service/cv_";
import ApiContext from "../../providers/context/api";
import {
  Certification,
  Education,
  Reference,
  WorkExperience,
} from "../../../types";
import { KeyboardAvoidingView } from "../../components/ui/customElements";
import Loading from "../../components/ui/_helpers/Loading";
import { State } from "./interfaces";
import { Controller, useForm, useWatch } from "react-hook-form";
import { convertToTitleCase } from "../../helper_functions/miscs";
import { useNotifications } from "../../hooks/app-hooks/useNotification";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { CVSchema } from "./Scheama";

const initialState: State = {
  education: [],
  experience: [],
  certificaton: [],
  refrences: [],
  first_name: "",
  last_name: "",
  middle_name: "",
  email: "",
  phone_number: "",
  addresse: "",
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

  const [errors, setErrors] = React.useState<any>({} as any);

  const theme = useContext(themeContext);
  const { useApiMutation, useApiQuery } = useContext(ApiContext);
  const { showHeaderTextHandler } = React.useContext(HeaderContext);
  const { showNotification } = useNotifications();

  const {
    getValues,
    control,
    setValue,
    // formState: { errors },
  } = useForm<State>({
    defaultValues: initialState,
  });

  const education = useWatch({ control, name: "education" });
  const experience = useWatch({ control, name: "experience" });
  const certificaton = useWatch({ control, name: "certificaton" });
  const refrences = useWatch({ control, name: "refrences" });

  const { data, refetch, isSuccess, isLoading } = useApiQuery({
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
        // education: newEducation,
        // experience: newExperience,
        // certificaton: newCertification,
        // refrences: newReference,
      };

      Object.keys(_data).forEach((field) => {
        setValue(field, _data[field]);
      });
    }
  }, [isSuccess, data]);

  const handleAddEducation = () => {
    const education = getValues("education") || [];

    // Check if any previously added education fields are empty
    const hasEmptyFields = education.some((item: Education) =>
      Object.values(item).some((value) => value === "")
    );

    if (hasEmptyFields) {
      // Show an error message or perform any other appropriate action
      showNotification({
        title: "Error",
        type: 0,
        message: "Please fill all fields",
      });
      return;
    }

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

  const handleRemoveEducation = (index: number) => {
    const education = getValues("education") || [];
    const newEducation = education.filter(
      (item: Education, _index) => _index !== index
    );
    setValue("education", newEducation);
    setTimeout(() => {
      educationRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleAddWorkExperience = () => {
    const workExperience = getValues("experience") || [];
    // Check if any previously added education fields are empty
    const hasEmptyFields = workExperience.some((item: WorkExperience) =>
      Object.values(item).some((value) => value === "")
    );

    if (hasEmptyFields) {
      // Show an error message or perform any other appropriate action
      showNotification({
        title: "Error",
        type: 0,
        message: "Please fill all fields",
      });
      return;
    }
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

  const handleRemoveWorkExperience = (index: number) => {
    const workExperience = getValues("experience") || [];
    const newWorkExperience = workExperience.filter(
      (item: WorkExperience, _index) => _index !== index
    );
    setValue("experience", newWorkExperience);
    setTimeout(() => {
      workExperienceRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleAddCertification = () => {
    const certifications = getValues("certificaton") || [];

    // Check if any previously added education fields are empty
    const hasEmptyFields = certifications.some((item: Certification) =>
      Object.values(item).some((value) => value === "")
    );

    if (hasEmptyFields) {
      // Show an error message or perform any other appropriate action
      showNotification({
        title: "Error",
        type: 0,
        message: "Please fill all fields",
      });
      return;
    }

    const newCertification = {
      id: certifications.length + 1,
      certification: "",
      year: "",
      issuer: "",
    };

    const newCertifications = [...certifications, newCertification];
    setValue("certificaton", newCertifications);

    setTimeout(() => {
      certificationRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleRemoveCertification = (index: number) => {
    const certifications = getValues("certificaton") || [];
    const newCertifications = certifications.filter(
      (item: Certification, _index) => _index !== index
    );
    setValue("certificaton", newCertifications);
    setTimeout(() => {
      certificationRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleAddReference = () => {
    const references = getValues("refrences") || [];

    // Check if any previously added education fields are empty
    const hasEmptyFields = references.some((item: Reference) =>
      Object.values(item).some((value) => value === "")
    );

    if (hasEmptyFields) {
      // Show an error message or perform any other appropriate action
      showNotification({
        title: "Error",
        type: 0,
        message: "Please fill all fields",
      });
      return;
    }

    const newReference = {
      id: references.length + 1,
      full_name: "",
      relationship: "",
      email: "",
      phone_number: "",
    };

    const newReferences = [...references, newReference];
    setValue("refrences", newReferences);

    setTimeout(() => {
      referenceRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleRemoveReference = (index: number) => {
    const references = getValues("refrences") || [];
    const newReferences = references.filter(
      (item: Reference, _index) => _index !== index
    );
    setValue("refrences", newReferences);
    setTimeout(() => {
      referenceRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSave = () => {
    const data = getValues();

    const _data = {
      ...data,
      education: JSON.stringify(
        data.education.map((obj) => {
          const { id, ...rest } = obj;
          return rest;
        })
      ),
      experience: JSON.stringify(
        data.experience.map((obj) => {
          const { id, ...rest } = obj;
          return rest;
        })
      ),
      certificaton: JSON.stringify(
        data.certificaton.map((obj) => {
          const { id, ...rest } = obj;
          return rest;
        })
      ),
      refrences: JSON.stringify(
        data.refrences.map((obj) => {
          const { id, ...rest } = obj;
          return rest;
        })
      ),
    };

    // console.log(__data);

    uploadCv.mutate(_data);
  };

  useFocusEffect(
    React.useCallback(() => {
      showHeaderTextHandler("CV Management");
      refetch();
    }, [])
  );

  useEffect(() => {
    console.log("dsfjds: ", uploadCv?.error?.response?.data?.errors);
    if (uploadCv?.error?.response?.data?.errors) {
      const { errors } = uploadCv?.error?.response?.data;
      const _errors: any = {};
      errors.map((item: any) => {
        _errors[item.field] = item.message[0];
      });

      setErrors(_errors);
    }
  }, [uploadCv.isError]);

  useEffect(() => {
    if (uploadCv.isSuccess) {
      navigation.goBack();
    }
  }, [uploadCv.isSuccess]);

  if (uploadCv.isLoading || isLoading) {
    return <Loading />;
  }

  const Card = ({
    children,
    handler,
    index,
    header,
  }: {
    children: any;
    handler: any;
    index: number;
    header: string;
  }) => {
    return (
      <View
        style={{
          marginLeft: scale(10),
          backgroundColor: index % 2 !== 0 ? theme.light_blue : "",
          borderColor: theme.primary,
          borderWidth: index % 2 === 0 ? StyleSheet.hairlineWidth : 0,
          padding: scale(10),
          borderRadius: scale(10),
          marginBottom: scale(10),
          width: scale(270),
          flex: 1,
        }}
        key={index}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>
            {header} {index + 1}
          </Text>
          <TouchableOpacity
            onPress={() => {
              handler(index);
            }}
          >
            <Ionicons
              name="trash-outline"
              size={scale(20)}
              color={theme.text}
            />
          </TouchableOpacity>
        </View>

        {children}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView style={[styles.container]} contentContainerStyle={{}}>
        <Seperator height={scale(20)} />
        <Pressable
          onPress={() => {
            navigation.navigate("Upload CV");
          }}
          style={[
            styles.uploadCVButton,
            {
              backgroundColor: theme.primary,
            },
          ]}
        >
          <AntDesign name="upload" size={scale(12)} color={theme.background} />
          <Text
            style={{
              fontSize: scale(12),
              fontWeight: "bold",
              color: theme.background,
              marginLeft: scale(5),
            }}
          >
            Upload Instead
          </Text>
        </Pressable>
        {/* <View
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
        </View> */}
        {/* input fields  */}
        <Seperator height={scale(20)} />

        <View
          style={{
            flex: 1,
            borderRadius: scale(10),
            borderColor: theme.placeholder,
            borderWidth: scale(1),
            padding: scale(14),
            backgroundColor: theme.light_blue,
          }}
        >
          <View>
            <View
              style={{
                paddingVertical: scale(10),
              }}
            >
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
                    onBlur={() => {
                      if (!value)
                        setErrors({
                          ...errors,
                          personal_statement: "This is required.",
                        });
                      else {
                        setErrors(
                          Object.keys(errors).filter(
                            (key) => key !== "personal_statement"
                          )
                        );
                      }
                    }}
                    onChangeText={(text) => {
                      onChange(text);
                    }}
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
              {errors.personal_statement && (
                <Text
                  style={{
                    color: theme.error,
                    fontSize: scale(10),
                  }}
                >
                  {errors.personal_statement}
                </Text>
              )}

              <View>
                {Object.keys(initialState).map((field, index) => {
                  if (
                    field === "personal_statement" ||
                    field === "education" ||
                    field === "experience" ||
                    field === "certificaton" ||
                    field === "refrences"
                  )
                    return null;
                  return (
                    <View>
                      <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        key={index}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            placeholder={convertToTitleCase(field)}
                            label={convertToTitleCase(field)}
                            onBlur={() => {
                              if (!value) {
                                setErrors({
                                  ...errors,
                                  [field]: "This is required.",
                                });
                              } else {
                                setErrors((prevErrors: any) => ({
                                  ...prevErrors,
                                  [field]: null,
                                }));
                              }
                            }}
                            onChangeText={(text) => onChange(text)}
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
                        name={field === "address" ? "addresse" : field}
                      />
                      {errors[field] && (
                        <Text
                          style={{
                            color: theme.error,
                            fontSize: scale(10),
                          }}
                        >
                          {errors[field]}
                        </Text>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>

            <Seperator height={scale(20)} />

            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: scale(16),
                    fontWeight: "bold",
                    color: theme.primary,
                  }}
                >
                  Education
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    handleAddEducation();
                  }}
                  style={{
                    marginLeft: scale(10),
                  }}
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={scale(20)}
                    color={theme.primary}
                  />
                </TouchableOpacity>
              </View>
              <Seperator height={scale(10)} />
              <ScrollView horizontal style={{ flex: 1 }} ref={educationRef}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {education?.map((item: Education, index) => (
                    <Card
                      header="Education"
                      handler={handleRemoveEducation}
                      index={index}
                    >
                      {Object.keys(item).map((key) => {
                        if (key === "id") return null;
                        return (
                          <Controller
                            key={key}
                            control={control}
                            rules={{
                              required: true,
                            }}
                            render={({
                              field: { onChange, onBlur, value },
                            }) => (
                              <Input
                                placeholder={key.replace(/_/g, " ")}
                                onBlur={onBlur}
                                onChangeText={(text) => onChange(text)}
                                value={value}
                              />
                            )}
                            name={`education[${index}].${key}`}
                          />
                        );
                      })}
                    </Card>
                  ))}
                </View>
              </ScrollView>
            </>
            {/* // work experience */}

            <Seperator height={scale(20)} />

            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: scale(16),
                    fontWeight: "bold",
                    color: theme.primary,
                  }}
                >
                  Work Experience
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    handleAddWorkExperience();
                  }}
                  style={{
                    marginLeft: scale(10),
                  }}
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={scale(20)}
                    color={theme.primary}
                  />
                </TouchableOpacity>
              </View>
              <Seperator height={scale(10)} />
              <ScrollView
                horizontal
                style={{ flex: 1 }}
                ref={workExperienceRef}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {experience?.map((item: WorkExperience, index) => (
                    <Card
                      header="Work Experience"
                      handler={handleRemoveWorkExperience}
                      index={index}
                    >
                      {Object.keys(item).map((key) => {
                        if (key === "id") return null;
                        return (
                          <Controller
                            key={key}
                            control={control}
                            rules={{
                              required: true,
                            }}
                            render={({
                              field: { onChange, onBlur, value },
                            }) => (
                              <Input
                                placeholder={key.replace(/_/g, " ")}
                                onBlur={onBlur}
                                onChangeText={(text) => onChange(text)}
                                value={value}
                              />
                            )}
                            name={`experience[${index}].${key}`}
                          />
                        );
                      })}
                    </Card>
                  ))}
                </View>
              </ScrollView>
            </>

            {/* // certification */}
            <Seperator height={scale(20)} />

            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: scale(16),
                    fontWeight: "bold",
                    color: theme.primary,
                  }}
                >
                  Certification
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    handleAddCertification();
                  }}
                  style={{
                    marginLeft: scale(10),
                  }}
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={scale(20)}
                    color={theme.primary}
                  />
                </TouchableOpacity>
              </View>
              <Seperator height={scale(10)} />
              <ScrollView horizontal style={{ flex: 1 }} ref={certificationRef}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {certificaton?.map((item: Certification, index) => (
                    <Card
                      header="Certification"
                      handler={handleRemoveCertification}
                      index={index}
                    >
                      {Object.keys(item).map((key) => {
                        if (key === "id") return null;
                        return (
                          <Controller
                            key={key}
                            control={control}
                            rules={{
                              required: true,
                            }}
                            render={({
                              field: { onChange, onBlur, value },
                            }) => (
                              <Input
                                placeholder={key.replace(/_/g, " ")}
                                onBlur={onBlur}
                                onChangeText={(text) => onChange(text)}
                                value={value}
                              />
                            )}
                            name={`certificaton[${index}].${key}`}
                          />
                        );
                      })}
                    </Card>
                  ))}
                </View>
              </ScrollView>
            </>

            {/* // reference */}
            <Seperator height={scale(20)} />
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: scale(16),
                    fontWeight: "bold",
                    color: theme.primary,
                  }}
                >
                  Reference
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    handleAddReference();
                  }}
                  style={{
                    marginLeft: scale(10),
                  }}
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={scale(20)}
                    color={theme.primary}
                  />
                </TouchableOpacity>
              </View>
              <Seperator height={scale(10)} />
              <ScrollView horizontal style={{ flex: 1 }} ref={referenceRef}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {refrences?.map((item: Reference, index) => (
                    <Card
                      header="Reference"
                      handler={handleRemoveReference}
                      index={index}
                    >
                      {Object.keys(item).map((key) => (
                        <Controller
                          key={key}
                          control={control}
                          rules={{
                            required: true,
                          }}
                          render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                              placeholder={key.replace(/_/g, " ")}
                              onBlur={onBlur}
                              onChangeText={(text) => onChange(text)}
                              value={value}
                            />
                          )}
                          name={`refrences[${index}].${key}`}
                        />
                      ))}
                    </Card>
                  ))}
                </View>
              </ScrollView>
            </>
          </View>
          <Seperator height={scale(20)} />
          <Button
            disabled={uploadCv.isLoading || isLoading}
            onPress={() => {
              handleSave();
              console.log(getValues());
            }}
          >
            Save
          </Button>
        </View>
        <Seperator height={scale(20)} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  uploadCVButton: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(7),
    borderRadius: scale(10),
    flexDirection: "row",
    alignSelf: "center",
    marginRight: scale(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
});
