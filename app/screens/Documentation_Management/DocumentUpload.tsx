import { Pressable, StyleSheet, View } from "react-native";
import React, { useCallback, useContext } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { HeaderContext } from "../../providers/context/header";
import { Button, Text } from "../../components/ui";
import { scale } from "react-native-size-matters";
import { Seperator } from "../../components/ui/_helpers";
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import ApiContext from "../../providers/context/api";
import { fileUploadFunc } from "../../providers/call-service/documentation";

const DocumentUpload = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { doc_obj } = route.params;
  const { showHeaderTextHandler } = React.useContext(HeaderContext);
  const { useApiMutation } = useContext(ApiContext);

  const [fileResponse, setFileResponse] = React.useState<any>(null);

  const handleDocumentSelection = useCallback(async (file_name: string) => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
    });
    if (result.type === "success") {
      setFileResponse((prev: any) => ({
        ...prev,
        [file_name]: result,
      }));
    }
  }, []);

  console.log("doc_obj", doc_obj);

  const uploadFile = useApiMutation({
    mutationFunction: fileUploadFunc,
  });

  const handleFileUpload = () => {
    if (!Object.keys(fileResponse).length) return alert("Please select a file");
    const formData = new FormData();
    formData.append("applicant_id", doc_obj?.id);
    Object.keys(fileResponse).forEach((key) => {
      if (fileResponse[key].type === "success") {
        formData.append(key, fileResponse[key]);
      }
    });

    // uploadFile.mutate(formData);
    console.log(formData);
  };

  useFocusEffect(
    React.useCallback(() => {
      showHeaderTextHandler("Upload Documents");
    }, [])
  );

  return (
    <View
      style={{
        backgroundColor: "white",
        paddingHorizontal: scale(20),
        paddingVertical: scale(20),
        flex: 1,
      }}
    >
      <Text>
        Please, Upload the following documents for confirmation purpose
      </Text>

      <Seperator height={20} />
      <View>
        {doc_obj?.docs_needed.map((doc: any, index: number) => (
          <Pressable
            onPress={() => {
              handleDocumentSelection(doc);
            }}
            key={index}
            style={{
              padding: scale(20),
              backgroundColor: "#f2f2f2",
              borderRadius: scale(10),
              marginBottom: scale(10),
              position: "relative",
            }}
          >
            <Text>
              {doc}{" "}
              {fileResponse?.[doc] && (
                <Text>
                  {" "}
                  - {fileResponse?.[doc]?.name.slice(0, 10) + "..."}
                  "✅"
                </Text>
              )}
            </Text>

            <Ionicons
              name="cloud-upload-outline"
              size={scale(30)}
              color="black"
              style={{
                position: "absolute",
                right: scale(20),
                top: scale(20),
              }}
            />
          </Pressable>
        ))}
      </View>

      <Seperator height={20} />

      <Button
        onPress={() => {
          handleFileUpload();
        }}
      >
        Submit
      </Button>
    </View>
  );
};

export default DocumentUpload;

const styles = StyleSheet.create({});
