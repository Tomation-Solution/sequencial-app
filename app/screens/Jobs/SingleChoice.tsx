import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import themeContext from "../../config/theme/themeContext";
import { scale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";

const SingleChoice = ({
  data,
  handleSelectOne,
  selected,
}: {
  data: any;
  handleSelectOne: any;
  selected: any;
}) => {
  const theme = useContext(themeContext);

  const handleSelect = (id: number, question_id: number, value: string) => {
    handleSelectOne(value, question_id, id);
  };

  return (
    <>
      <Text style={{ color: theme.text, fontWeight: "bold" }}>Select one</Text>
      {data?.map((item: any) => {
        const question_id = item?.id;

        return (
          <View
            key={item?.id}
            style={{
              marginTop: scale(10),
              padding: scale(10),
              borderColor: theme.primary,
              borderWidth: 1,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: theme.primary,
              }}
            >
              {item?.quetion}
            </Text>

            <View
              style={{
                marginTop: scale(5),
              }}
            >
              {item?.option_to_choose_from?.map(
                (option: any, index: number) => {
                  const isSelected =
                    selected.filter(
                      (item: { question_id: number; id: number }) =>
                        item.question_id === question_id && item.id === index
                    ).length > 0;

                  console.log("dsijfds: ", isSelected);

                  return (
                    <Pressable
                      key={option?.id}
                      onPress={() => handleSelect(index, question_id, option)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: scale(10),
                        borderColor: isSelected
                          ? theme.primary
                          : theme.grayText,
                        borderWidth: isSelected ? 1 : 0,
                        borderRadius: 8,
                        paddingLeft: scale(10),
                      }}
                    >
                      <Text
                        style={{
                          color: theme.grayText,
                          fontSize: scale(13),
                        }}
                      >
                        {option}
                      </Text>

                      {isSelected && (
                        <Ionicons
                          name="checkmark"
                          size={20}
                          color={theme.primary}
                          style={{
                            marginLeft: scale(10),
                          }}
                        />
                      )}
                    </Pressable>
                  );
                }
              )}
            </View>
          </View>
        );
      })}
    </>
  );
};

export default SingleChoice;

const styles = StyleSheet.create({});
