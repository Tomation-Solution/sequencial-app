import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useContext, useEffect } from "react";
import { Button, Text } from "../../components/ui";
import { scale } from "react-native-size-matters";
import { Seperator } from "../../components/ui/_helpers";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import themeContext from "../../config/theme/themeContext";
import { images } from "../../assets";
import {
  calculateDaysToToday,
  dateFormaterNow,
} from "../../helper_functions/dateFormater";
import JobWrapper from "./JobWrapper";
import ApiContext from "../../providers/context/api";
import { jobApply } from "../../providers/call-service/jobs";
import { HeaderContext } from "../../providers/context/header";
import { useFocusEffect } from "@react-navigation/native";

const Apply = ({ navigation, route, setShowHeader }: any) => {
  const [fileResponse, setFileResponse] = React.useState<any>(null);
  const { showHeaderTextHandler } = React.useContext(HeaderContext);
  const [applyWithCv, setApplyWithCv] = React.useState<boolean>(false);

  const theme = useContext(themeContext);
  const { useApiMutation } = useContext<any>(ApiContext);
  const { job_id, job_variant, extraData } = route.params;
  const { location, org_name, job_title, org_logo, created_on } = extraData;

  console.log("job_variant", job_variant);

  const { mutate, isLoading, isSuccess } = useApiMutation({
    mutationFunction: jobApply,
  });

  const handleApply = () => {
    navigation.navigate("Job_Question", {
      job_id,
    });
  };

  const handleDocumentSelection = useCallback(async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (result.type === "success") {
      setFileResponse(result);
    }
  }, []);

  const handleRemoveFile = () => {
    setFileResponse(null);
  };

  useEffect(() => {
    if (isSuccess && job_variant === "filter_and_test") {
      navigation.navigate("Job_Question", {
        job_id,
      });
    }
  }, [isSuccess]);

  useFocusEffect(
    React.useCallback(() => {
      showHeaderTextHandler("Apply");
      setShowHeader(false);
    }, [])
  );

  return (
    <JobWrapper
      navigation={navigation}
      company={org_name}
      location={location}
      org_logo={org_logo}
      job_title={job_title}
      posted_on={calculateDaysToToday(created_on)}
    >
      <View
        style={{
          padding: scale(10),
        }}
      >
        {applyWithCv && (
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: scale(18),
              }}
            >
              Upload CV
            </Text>
            <Seperator height={scale(10)} />
            <Text
              style={{
                fontSize: scale(14),
              }}
            >
              Add your CV/Resume to apply for a job
            </Text>

            <Seperator height={scale(20)} />
            {fileResponse === null ? (
              <TouchableOpacity
                onPress={handleDocumentSelection}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: theme.placeholder,
                  borderWidth: scale(3),
                  borderRadius: scale(18),
                  borderStyle: "dashed",
                  padding: scale(15),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <AntDesign
                    name="clouduploado"
                    size={24}
                    color={theme.placeholder}
                  />
                  <Text
                    style={{
                      marginLeft: scale(10),
                    }}
                  >
                    Upload CV/Resume
                  </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  borderColor: theme.placeholder,
                  borderWidth: scale(2),
                  borderRadius: scale(18),
                  borderStyle: "dashed",
                  padding: scale(15),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                  }}
                >
                  <Image
                    source={images.pdf}
                    style={{
                      width: scale(50),
                      height: scale(50),
                      resizeMode: "contain",
                      marginRight: scale(10),
                    }}
                  />
                  <View>
                    <Text
                      style={{
                        color: theme.text,
                        fontSize: scale(14),
                      }}
                    >
                      {fileResponse?.name}
                    </Text>
                    <Text
                      style={{
                        color: theme.placeholder,
                        fontSize: scale(12),
                      }}
                    >
                      {fileResponse?.size} Kb {dateFormaterNow()}
                    </Text>
                  </View>
                </View>

                <Seperator height={scale(15)} />

                <TouchableOpacity
                  onPress={handleRemoveFile}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <FontAwesome5
                    name="trash-alt"
                    size={scale(20)}
                    color={theme.error}
                  />
                  <Text
                    style={{
                      color: theme.error,
                      fontSize: scale(14),
                      marginLeft: scale(10),
                    }}
                  >
                    Remove file
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        <Seperator height={scale(20)} />
        <TouchableOpacity
          onPress={() => setApplyWithCv(!applyWithCv)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            //   justifyContent: "center",
          }}
        >
          <View
            style={{
              borderColor: applyWithCv ? theme.primary : theme.placeholder,
              backgroundColor: applyWithCv ? theme.primary : theme.background,
              borderWidth: scale(2),
              borderRadius: scale(3),
              width: scale(15),
              height: scale(15),
            }}
          />
          <Text
            style={{
              marginLeft: scale(8),
              fontSize: scale(12),
              color: applyWithCv ? theme.primary : theme.text,
            }}
          >
            Apply with new CV
          </Text>
        </TouchableOpacity>

        <Seperator height={scale(20)} />

        <Button
          onPress={handleApply}
          disabled={(applyWithCv && fileResponse === null) || isLoading}
          styles={{
            backgroundColor:
              (applyWithCv && fileResponse === null) || isLoading
                ? theme.placeholder
                : theme.primary,
          }}
        >
          {fileResponse === null ? "APPLY" : "PROCEED"}
        </Button>
      </View>
    </JobWrapper>
  );
};

export default Apply;

const styles = StyleSheet.create({});
