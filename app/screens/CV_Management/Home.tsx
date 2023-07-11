import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { scale } from "react-native-size-matters";
import { Seperator } from "../../components/ui/_helpers";
import themeContext from "../../config/theme/themeContext";
import { AntDesign } from "@expo/vector-icons";
import { State } from "./interfaces";
import { convertToTitleCase } from "../../helper_functions/miscs";
import { Button, Input, Text } from "../../components/ui";
import { TouchableOpacity } from "react-native-gesture-handler";
import Card from "./Card";
import DateInput from "../../components/ui/Input/DateInput";
import ApiContext from "../../providers/context/api";
import {
  fetch_user_data,
  update_job_seeker,
} from "../../providers/call-service/cv_";
import { useFocusEffect } from "@react-navigation/native";
import { HeaderContext } from "../../providers/context/header";
import { useNotifications } from "../../hooks/app-hooks/useNotification";
import Loading from "../../components/ui/_helpers/Loading";
import CountryInput from "../../components/ui/Input/CountryInput";

const initialState: State = {
  education: [],
  first_name: "",
  middle_name: "",
  last_name: "",
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
  experience: [],
  certificaton: [],
  refrences: [],
};

// reducer functions

const handleEducationChange = (
  field: string,
  value: string,
  index: number,
  dispatch: any
) => {
  dispatch({
    type: "HANDLE_EDUCATION_CHANGE",
    payload: {
      field,
      value,
      index,
    },
  });
};

const handleWorkExperienceChange = (
  field: string,
  value: string,
  index: number,
  dispatch: any
) => {
  dispatch({
    type: "HANDLE_WORK_EXPERIENCE_CHANGE",
    payload: {
      field,
      value,
      index,
    },
  });
};

const handleCertificationChange = (
  field: string,
  value: string,
  index: number,
  dispatch: any
) => {
  dispatch({
    type: "HANDLE_CERTIFICATION_CHANGE",
    payload: {
      field,
      value,
      index,
    },
  });
};

const handleReferenceChange = (
  field: string,
  value: string,
  index: number,
  dispatch: any
) => {
  dispatch({
    type: "HANDLE_REFERENCE_CHANGE",
    payload: {
      field,
      value,
      index,
    },
  });
};

const handleDetailsChange = (field: string, value: string, dispatch: any) => {
  dispatch({
    type: "HANDLE_DETAILS_CHANGE",
    payload: {
      field,
      value,
    },
  });
};

const removeEducation = (index: number, dispatch: any, ref: any) => {
  dispatch({
    type: "REMOVE_EDUCATION",
    payload: index,
  });
  setTimeout(() => {
    ref.current?.scrollToEnd({ animated: true });
  }, 100);
};

const removeWorkExperience = (index: number, dispatch: any, ref: any) => {
  dispatch({
    type: "REMOVE_WORK_EXPERIENCE",
    payload: index,
  });
  setTimeout(() => {
    ref.current?.scrollToEnd({ animated: true });
  }, 100);
};

const removeCertification = (index: number, dispatch: any, ref: any) => {
  dispatch({
    type: "REMOVE_CERTIFICATION",
    payload: index,
  });
  setTimeout(() => {
    ref.current?.scrollToEnd({ animated: true });
  }, 100);
};

const removeReference = (index: number, dispatch: any, ref: any) => {
  dispatch({
    type: "REMOVE_REFERENCE",
    payload: index,
  });
  setTimeout(() => {
    ref.current?.scrollToEnd({ animated: true });
  }, 100);
};

const handleDetailsBlur = (field: string, value: string, dispatch: any) => {
  dispatch({
    type: "HANDLE_DETAILS_BLUR",
    payload: {
      field,
      value,
    },
  });
};

const Home = ({ navigation, route }: { navigation: any; route: any }) => {
  // context
  const theme = useContext(themeContext);
  const { useApiMutation, useApiQuery } = useContext(ApiContext);
  const { showHeaderTextHandler } = React.useContext(HeaderContext);
  const { showNotification } = useNotifications();
  const [country, setCountry] = useState<any>(null);

  // state hooks
  const [errors, setErrors] = React.useState<any>({} as any);

  // reducer
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "HANDLE_DETAILS_CHANGE":
        return {
          ...state,
          [action.payload.field]: action.payload.value,
        };

      case "HANDLE_DETAILS_BLUR":
        if (!action.payload.value) {
          setErrors({
            ...errors,
            [action.payload.field]: "This is required.",
          });

          return {
            ...state,
            [action.payload.field]: null,
          };
        } else {
          setErrors((prevErrors: any) => ({
            ...prevErrors,
            [action.payload.field]: null,
          }));

          return {
            ...state,
            [action.payload.field]: action.payload.value,
          };
        }
      case "HANDLE_EDUCATION_CHANGE":
        return {
          ...state,
          education: state.education.map((item: any, index: number) => {
            if (index === action.payload.index) {
              return {
                ...item,
                [action.payload.field]: action.payload.value,
              };
            }
            return item;
          }),
        };

      case "HANDLE_WORK_EXPERIENCE_CHANGE":
        return {
          ...state,
          experience: state.experience.map((item: any, index: number) => {
            if (index === action.payload.index) {
              return {
                ...item,
                [action.payload.field]: action.payload.value,
              };
            }
            return item;
          }),
        };

      case "HANDLE_CERTIFICATION_CHANGE":
        return {
          ...state,
          certificaton: state.certificaton.map((item: any, index: number) => {
            if (index === action.payload.index) {
              return {
                ...item,
                [action.payload.field]: action.payload.value,
              };
            }
            return item;
          }),
        };

      case "HANDLE_REFERENCE_CHANGE":
        return {
          ...state,
          refrences: state.refrences.map((item: any, index: number) => {
            if (index === action.payload.index) {
              return {
                ...item,
                [action.payload.field]: action.payload.value,
              };
            }
            return item;
          }),
        };

      case "ADD_EDUCATION":
        return {
          ...state,
          education: [...state.education, action.payload],
        };
      case "ADD_WORK_EXPERIENCE":
        return {
          ...state,
          experience: [...state.experience, action.payload],
        };
      case "ADD_CERTIFICATION":
        return {
          ...state,
          certificaton: [...state.certificaton, action.payload],
        };
      case "ADD_REFERENCE":
        return {
          ...state,
          refrences: [...state.refrences, action.payload],
        };
      case "REMOVE_EDUCATION":
        return {
          ...state,
          education: state.education.filter(
            (item: any, index: number) => index !== action.payload
          ),
        };
      case "REMOVE_WORK_EXPERIENCE":
        return {
          ...state,
          experience: state.experience.filter(
            (item: any, index: number) => index !== action.payload
          ),
        };
      case "REMOVE_CERTIFICATION":
        return {
          ...state,
          certificaton: state.certificaton.filter(
            (item: any, index: number) => index !== action.payload
          ),
        };
      case "REMOVE_REFERENCE":
        return {
          ...state,
          refrences: state.refrences.filter(
            (item: any, index: number) => index !== action.payload
          ),
        };

        return {
          ...state,
          userDetails: action.payload,
        };
      case "SET_EDUCATION":
        return {
          ...state,
          education: action.payload,
        };

      case "SET_WORK_EXPERIENCE":
        return {
          ...state,
          experience: action.payload,
        };
      case "SET_CERTIFICATIONS":
        return {
          ...state,
          certificaton: action.payload,
        };
      case "SET_REFERENCES":
        return {
          ...state,
          refrences: action.payload,
        };
      case "SET_USER_DETAILS":
        return {
          ...state,
          ...action.payload,
        };

      default:
        return state;
    }
  };

  // reducer hooks
  const [state, dispatch] = useReducer(reducer, initialState);

  // refs
  const educationRef = useRef<ScrollView>(null);
  const workExperienceRef = useRef<ScrollView>(null);
  const certificationRef = useRef<ScrollView>(null);
  const referenceRef = useRef<ScrollView>(null);

  // appi calls

  const { data, error, refetch, isSuccess, isLoading } = useApiQuery({
    queryKey: "fetchUserData",
    queryFunction: fetch_user_data,
  });

  const uploadCv = useApiMutation({
    mutationFunction: update_job_seeker,
  });

  // handlers
  const addEducation = (dispatch: any, ref: any) => {
    // Check if any previously added education fields are empty

    const hasEmptyFields = state.education.some((item: any) =>
      Object.values(item).some((value) => value === "")
    );

    if (hasEmptyFields) {
      // Show an error message or perform any other appropriate action
      showNotification({
        title: "...🙂?",
        type: 2,
        message: "Please fill all fields",
      });
      return;
    }
    dispatch({
      type: "ADD_EDUCATION",
      payload: {
        school_name: "",
        degree_type: "",
        course_of_study: "",
        start_date: "",
        end_date: "",
      },
    });
    setTimeout(() => {
      ref.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const addWorkExperience = (dispatch: any, ref: any) => {
    // Check if any previously added education fields are empty

    const hasEmptyFields = state.experience.some((item: any) =>
      Object.values(item).some((value) => value === "")
    );

    if (hasEmptyFields) {
      // Show an error message or perform any other appropriate action
      showNotification({
        title: "...🙂?",
        type: 2,
        message: "Please fill all fields",
      });
      return;
    }

    dispatch({
      type: "ADD_WORK_EXPERIENCE",
      payload: {
        company: "",
        end_year: "",
        responsibilities: "",
        role: "",
        start_year: "",
      },
    });
    setTimeout(() => {
      ref.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const addCertification = (dispatch: any, ref: any) => {
    // Check if any previously added education fields are empty

    const hasEmptyFields = state.certificaton.some((item: any) =>
      Object.values(item).some((value) => value === "")
    );

    if (hasEmptyFields) {
      // Show an error message or perform any other appropriate action
      showNotification({
        title: "...🙂?",
        type: 2,
        message: "Please fill all fields",
      });
      return;
    }
    dispatch({
      type: "ADD_CERTIFICATION",
      payload: {
        certification: "",
        issuer: "",
        start_year: "",
      },
    });
    setTimeout(() => {
      ref.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const addReference = (dispatch: any, ref: any) => {
    // Check if any previously added education fields are empty

    const hasEmptyFields = state.refrences.some((item: any) =>
      Object.values(item).some((value) => value === "")
    );

    if (hasEmptyFields) {
      // Show an error message or perform any other appropriate action
      showNotification({
        title: "...🙂?",
        type: 2,
        message: "Please fill all fields",
      });
      return;
    }

    dispatch({
      type: "ADD_REFERENCE",
      payload: {
        full_name: "",
        email: "",
        phone_number: "",
        relationship: "",
      },
    });
    setTimeout(() => {
      ref.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSave = () => {
    const _data = state;

    // const hasErrors = Object.values(errors).some((item) => item !== null);

    // if (hasErrors) {
    //   showNotification({
    //     title: "...🙂?",
    //     type: 2,
    //     message: "Please fill all fields",
    //   });
    //   return;
    // }

    const formData = new FormData();

    {
      Object.keys(state).map((field, index) => {
        if (
          field === "education" ||
          field === "experience" ||
          field === "certificaton" ||
          field === "refrences"
        ) {
          return null;
        } else if (field === "phone_number") {
          formData.append(field, country?.callingCode + "-" + state[field]);
        } else formData.append(field, state[field]);
      });
    }

    formData.append("education", JSON.stringify(state.education));
    formData.append("experience", JSON.stringify(state.experience));
    formData.append("certificaton", JSON.stringify(state.certificaton));
    formData.append("refrences", JSON.stringify(state.refrences));

    // console.log("data: ", formData);
    uploadCv.mutate(formData);
  };

  // side effects

  useFocusEffect(
    React.useCallback(() => {
      showHeaderTextHandler("CV Management");
      refetch();
    }, [])
  );

  useEffect(() => {
    if (isSuccess) {
      const fetchedData = data?.data?.user_extra?.job_seakers?.cvStucture;
      if (fetchedData) {
        dispatch({ type: "SET_EDUCATION", payload: fetchedData.education });
        dispatch({
          type: "SET_WORK_EXPERIENCE",
          payload: fetchedData.experience,
        });
        dispatch({
          type: "SET_CERTIFICATIONS",
          payload: fetchedData.certificaton,
        });
        dispatch({ type: "SET_REFERENCES", payload: fetchedData.refrences });
        dispatch({
          type: "SET_USER_DETAILS",
          payload: {
            first_name: fetchedData.first_name || "",
            last_name: fetchedData.last_name || "",
            middle_name: fetchedData.middle_name || "",
            email: fetchedData.email || "",
            phone_number: fetchedData.phone_number.split("-")[1] || "",
            address: fetchedData.addresse || "",
            city: fetchedData.city || "",
            state: fetchedData.state || "",
            country_of_residence: fetchedData.country_of_residence || "",
            linkdin: fetchedData.linkdin || "",
            twitter: fetchedData.twitter || "",
            personal_statement: fetchedData.personal_statement || "",
          },
        });

        setCountry({
          callingCode: fetchedData.phone_number.split("-")[0],
        });

        console.log("phone number", fetchedData.phone_number);
      }
    }
  }, [isSuccess, data]);

  useEffect(() => {
    // console.log("dsfjds: ", uploadCv?.error?.response?.data?.errors);
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

  return (
    <ScrollView style={[styles.container]}>
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

      <View
        style={{
          paddingVertical: scale(10),
          paddingHorizontal: scale(20),
        }}
      >
        <Text>Personal Statement</Text>

        <TextInput
          numberOfLines={5}
          placeholder="Personal Statement"
          onBlur={() =>
            handleDetailsBlur(
              "personal_statement",
              state.personal_statement,
              dispatch
            )
          }
          onChangeText={(text) => {
            handleDetailsChange("personal_statement", text, dispatch);
          }}
          multiline={true}
          value={state.personal_statement}
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
              <View key={index}>
                {field !== "phone_number" ? (
                  <Input
                    placeholder={convertToTitleCase(
                      field === "addresse"
                        ? "address"
                        : field === "linkdin"
                        ? "linkedin"
                        : field
                    )}
                    label={convertToTitleCase(
                      field === "addresse"
                        ? "address"
                        : field === "linkdin"
                        ? "linkedin"
                        : field
                    )}
                    onBlur={() => {
                      if (
                        field !== "linkdin" &&
                        field !== "twitter" &&
                        field !== "middle_name"
                      )
                        handleDetailsBlur(field, state[field], dispatch);
                    }}
                    onChangeText={(text) => {
                      handleDetailsChange(field, text, dispatch);
                    }}
                    value={state[field]}
                  />
                ) : (
                  <CountryInput
                    country={country}
                    setCountry={setCountry}
                    onChangeText={(text) => {
                      handleDetailsChange(field, text, dispatch);
                    }}
                    placeholder={convertToTitleCase(field)}
                    label={convertToTitleCase(field)}
                    onBlur={() => {
                      handleDetailsBlur(field, state[field], dispatch);
                    }}
                    keyboardType={
                      field === "phone_number" ? "number-pad" : "default"
                    }
                    value={state[field]}
                  />
                )}

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
      <View>
        <Text
          style={{
            marginLeft: scale(10),
            fontSize: scale(16),
            fontWeight: "bold",
          }}
        >
          Education
        </Text>
        <Seperator height={scale(10)} />
        <View>
          <ScrollView horizontal ref={educationRef}>
            {state.education.map((item: any, index: number) => {
              return (
                <Card
                  header="Education"
                  index={index}
                  handler={() => removeEducation(index, dispatch, educationRef)}
                  key={index}
                >
                  <Input
                    placeholder="School Name"
                    label="School Name"
                    onChangeText={(text) => {
                      handleEducationChange(
                        "school_name",
                        text,
                        index,
                        dispatch
                      );
                    }}
                    value={item.school_name}
                  />
                  <Input
                    placeholder="Degree"
                    label="Degree"
                    onChangeText={(text) => {
                      handleEducationChange(
                        "degree_type",
                        text,
                        index,
                        dispatch
                      );
                    }}
                    value={item.degree_type}
                  />

                  <Input
                    placeholder="Course of Study"
                    label="Course of Study"
                    onChangeText={(text) => {
                      handleEducationChange(
                        "course_of_study",
                        text,
                        index,
                        dispatch
                      );
                    }}
                    value={item.course_of_study}
                  />

                  <DateInput
                    placeholder="Start Year"
                    label="Start Year"
                    onChangeText={(text: string) => {
                      handleEducationChange(
                        "start_year",
                        text,
                        index,
                        dispatch
                      );
                    }}
                    value={item.start_year}
                  />
                  <DateInput
                    placeholder="End Year"
                    label="End Year"
                    onChangeText={(text: string) => {
                      handleEducationChange("end_year", text, index, dispatch);
                    }}
                    value={item.end_year}
                  />
                </Card>
              );
            })}
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => {
            addEducation(dispatch, educationRef);
          }}
          style={{
            alignSelf: "center",
            padding: scale(10),
            backgroundColor: theme.primary,
            borderRadius: scale(10),
            marginTop: scale(10),
          }}
        >
          <Text
            style={{
              color: theme.background,
              fontSize: scale(12),
              fontWeight: "bold",
            }}
          >
            Add Education
          </Text>
        </TouchableOpacity>
      </View>

      <Seperator height={scale(20)} />
      <View>
        <Text
          style={{
            marginLeft: scale(10),
            fontSize: scale(16),
            fontWeight: "bold",
          }}
        >
          Work Experience
        </Text>
        <Seperator height={scale(10)} />
        <View>
          <ScrollView horizontal ref={workExperienceRef}>
            {state.experience.map((item: any, index: number) => {
              return (
                <Card
                  header="Work Experience"
                  index={index}
                  handler={() =>
                    removeWorkExperience(index, dispatch, workExperienceRef)
                  }
                  key={index}
                >
                  <Input
                    placeholder="Company Name"
                    label="Company Name"
                    onChangeText={(text) => {
                      handleWorkExperienceChange(
                        "company",
                        text,
                        index,
                        dispatch
                      );
                    }}
                    value={item.company}
                  />
                  <Input
                    placeholder="Job Title"
                    label="Job Title"
                    onChangeText={(text) => {
                      handleWorkExperienceChange("role", text, index, dispatch);
                    }}
                    value={item.role}
                  />
                  <Input
                    placeholder="Job Responsibilities"
                    label="Job Responsibilities"
                    onChangeText={(text) => {
                      handleWorkExperienceChange(
                        "responsibilities",
                        text,
                        index,
                        dispatch
                      );
                    }}
                    value={item.responsibilities}
                  />
                  <DateInput
                    placeholder="Start Year"
                    label="Start Year"
                    onChangeText={(text: string) => {
                      handleWorkExperienceChange(
                        "start_year",
                        text,
                        index,
                        dispatch
                      );
                    }}
                    value={item.start_year}
                  />
                  <DateInput
                    placeholder="End Year"
                    label="End Year"
                    onChangeText={(text: string) => {
                      handleWorkExperienceChange(
                        "end_year",
                        text,
                        index,
                        dispatch
                      );
                    }}
                    value={item.end_year}
                  />
                </Card>
              );
            })}
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => {
            addWorkExperience(dispatch, workExperienceRef);
          }}
          style={{
            alignSelf: "center",
            padding: scale(10),
            backgroundColor: theme.primary,
            borderRadius: scale(10),
            marginTop: scale(10),
          }}
        >
          <Text
            style={{
              color: theme.background,
              fontSize: scale(12),
              fontWeight: "bold",
            }}
          >
            Add Work Experience
          </Text>
        </TouchableOpacity>
      </View>

      <Seperator height={scale(20)} />
      <View>
        <Text
          style={{
            marginLeft: scale(10),
            fontSize: scale(16),
            fontWeight: "bold",
          }}
        >
          Certification
        </Text>
        <Seperator height={scale(10)} />
        <View>
          <ScrollView horizontal ref={certificationRef}>
            {state.certificaton.map((item: any, index: number) => {
              return (
                <Card
                  header="Certification"
                  index={index}
                  handler={() =>
                    removeCertification(index, dispatch, certificationRef)
                  }
                  key={index}
                >
                  <Input
                    placeholder="Certification"
                    label="Certification"
                    onChangeText={(text) => {
                      handleCertificationChange(
                        "certification",
                        text,
                        index,
                        dispatch
                      );
                    }}
                    value={item.certification}
                  />
                  <Input
                    placeholder="Issuer"
                    label="Issuer"
                    onChangeText={(text) => {
                      handleCertificationChange(
                        "issuer",
                        text,
                        index,
                        dispatch
                      );
                    }}
                    value={item.issuer}
                  />
                  <DateInput
                    placeholder="Start Year"
                    label="Start Year"
                    onChangeText={(text: string) => {
                      handleCertificationChange(
                        "start_year",
                        text,
                        index,
                        dispatch
                      );
                    }}
                    value={item.start_year}
                  />
                </Card>
              );
            })}
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => {
            addCertification(dispatch, certificationRef);
          }}
          style={{
            alignSelf: "center",
            padding: scale(10),
            backgroundColor: theme.primary,
            borderRadius: scale(10),
            marginTop: scale(10),
          }}
        >
          <Text
            style={{
              color: theme.background,
              fontSize: scale(12),
              fontWeight: "bold",
            }}
          >
            Add Certification
          </Text>
        </TouchableOpacity>
      </View>

      <Seperator height={scale(20)} />
      <View>
        <Text
          style={{
            marginLeft: scale(10),
            fontSize: scale(16),
            fontWeight: "bold",
          }}
        >
          Reference
        </Text>
        <Seperator height={scale(10)} />
        <View>
          <ScrollView horizontal ref={referenceRef}>
            {state.refrences.map((item: any, index: number) => {
              return (
                <Card
                  header="Reference"
                  index={index}
                  handler={() => removeReference(index, dispatch, referenceRef)}
                  key={index}
                >
                  <Input
                    placeholder="Full Name"
                    label="Full Name"
                    onChangeText={(text) => {
                      handleReferenceChange("full_name", text, index, dispatch);
                    }}
                    value={item.full_name}
                  />
                  <Input
                    placeholder="Email"
                    label="Email"
                    onChangeText={(text) => {
                      handleReferenceChange("email", text, index, dispatch);
                    }}
                    value={item.email}
                  />
                  <Input
                    placeholder="Phone Number"
                    label="Phone Number"
                    onChangeText={(text) => {
                      handleReferenceChange(
                        "phone_number",
                        text,
                        index,
                        dispatch
                      );
                    }}
                    value={item.phone_number}
                  />
                  <Input
                    placeholder="Relationship"
                    label="Relationship"
                    onChangeText={(text) => {
                      handleReferenceChange(
                        "relationship",
                        text,
                        index,
                        dispatch
                      );
                    }}
                    value={item.relationship}
                  />
                </Card>
              );
            })}
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => {
            addReference(dispatch, referenceRef);
          }}
          style={{
            alignSelf: "center",
            padding: scale(10),
            backgroundColor: theme.primary,
            borderRadius: scale(10),
            marginTop: scale(10),
          }}
        >
          <Text
            style={{
              color: theme.background,
              fontSize: scale(12),
              fontWeight: "bold",
            }}
          >
            Add Reference
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingHorizontal: scale(20),
        }}
      >
        <Seperator height={scale(20)} />
        <Button onPress={handleSave}>Save</Button>
        <Seperator height={scale(20)} />
      </View>

      <Seperator height={scale(20)} />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    position: "relative",
    backgroundColor: "white",
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
