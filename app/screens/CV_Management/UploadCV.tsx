import {
  Image,
  ImageComponent,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useContext } from "react";
import { Button, Text } from "../../components/ui";
import { scale } from "react-native-size-matters";
import { Seperator } from "../../components/ui/_helpers";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import theme from "../../config/theme/color_theme";
import themeContext from "../../config/theme/themeContext";
import { images } from "../../assets";
import { dateFormaterNow } from "../../helper_functions/dateFormater";

const UploadCv = ({ navigation }: any) => {
  const theme = useContext(themeContext);
  const [fileResponse, setFileResponse] = React.useState<any>(null);

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

  return (
    <View
      style={{
        padding: scale(10),
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <Seperator height={scale(20)} />
      <Pressable
        onPress={() => {
          navigation.goBack();
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
        <Text
          style={{
            fontSize: scale(12),
            fontWeight: "bold",
            color: theme.text,
            marginLeft: scale(5),
          }}
        >
          Setup Instead
        </Text>
      </Pressable>

      <Seperator height={scale(20)} />

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
        Please upload your CV/Resume
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
            height: scale(100),
            width: "100%",
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
      {fileResponse !== null && <Button>PROCEED</Button>}
    </View>
  );
};

export default UploadCv;

const styles = StyleSheet.create({});
