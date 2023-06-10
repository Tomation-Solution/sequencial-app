import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useContext, useEffect } from "react";
import { Button, Text } from "../../components/ui";
import { scale } from "react-native-size-matters";
import { Seperator } from "../../components/ui/_helpers";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import themeContext from "../../config/theme/themeContext";
import { images } from "../../assets";
import { dateFormaterNow } from "../../helper_functions/dateFormater";
import JobWrapper from "./JobWrapper";
import ApiContext from "../../providers/context/api";
import { jobApply } from "../../providers/call-service/jobs";

const Apply = ({ navigation, route }: any) => {
  const [fileResponse, setFileResponse] = React.useState<any>(null);

  const theme = useContext(themeContext);
  const { useApiMutation } = useContext(ApiContext);
  const { job_id, job_variant } = route.params;

  const { mutate, isLoading, isSuccess } = useApiMutation({
    mutationFunction: jobApply,
  });

  const handleApply = () => {
    mutate({
      job_id,
      file: fileResponse,
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
    if (isSuccess && job_variant === "question") {
      navigation.navigate("Job_Question", {
        job_id,
      });
    }
  }, [isSuccess]);

  return (
    <JobWrapper>
      <View
        style={{
          padding: scale(10),
        }}
      >
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

        <Seperator height={scale(20)} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            //   justifyContent: "center",
          }}
        >
          <View
            style={{
              borderColor: theme.placeholder,
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
            }}
          >
            Apply with existing CV
          </Text>
        </View>

        <Seperator height={scale(20)} />

        <Button
          onPress={handleApply}
          disabled={fileResponse === null || isLoading}
          styles={{
            backgroundColor:
              fileResponse === null || isLoading
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
