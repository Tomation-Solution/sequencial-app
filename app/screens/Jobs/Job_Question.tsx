import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import React, { useContext, useEffect } from "react";
import ApiContext from "../../providers/context/api";
import { jobQuestion } from "../../providers/call-service/jobs";
import Loading from "../../components/ui/_helpers/Loading";
import themeContext from "../../config/theme/themeContext";
import { scale } from "react-native-size-matters";
import { CustomInput, Text } from "../../components/ui";
import { Seperator } from "../../components/ui/_helpers";
import { Ionicons } from "@expo/vector-icons";
import SingleChoice from "./SingleChoice";

const Job_Question = ({ navigation, route }: any) => {
  // const { job_id } = route?.params;

  const theme = useContext(themeContext);
  const { useApiMutation } = useContext(ApiContext);
  const [formState, setFormState] = React.useState<any>({
    filter_quetion_option: [],
    fill_in_the_gap: [],
  });

  const [selected, setSelected] = React.useState<
    {
      id: number;
      question_id: number;
    }[]
  >([]);

  const { mutate, isLoading, isSuccess, data } = useApiMutation({
    mutationFunction: jobQuestion,
  });

  useEffect(() => {
    mutate({
      job_id: 3,
    });
  }, []);

  const handleFillInTheGap = (value: string, id: number) => {
    setFormState({
      ...formState,
      fill_in_the_gap: [
        ...formState.fill_in_the_gap,
        {
          id,
          answer: value,
        },
      ],
    });
  };

  const handleSelectOne = (value: string, question_id: number, id: number) => {
    setFormState((prevState: any) => {
      const isObjectExist = prevState.filter_quetion_option.some(
        (item: any) => item.question_id === question_id
      );

      if (isObjectExist) {
        return {
          ...prevState,
          filter_quetion_option: prevState.filter_quetion_option.map(
            (item: any) =>
              item.question_id === question_id
                ? { ...item, answer: value }
                : item
          ),
        };
      }

      return {
        ...prevState,
        filter_quetion_option: [
          ...prevState.filter_quetion_option,
          {
            question_id,
            answer: value,
          },
        ],
      };
    });

    if (
      selected.some(
        (item: { question_id: number }) => item.question_id === question_id
      )
    ) {
      setSelected((prevState) =>
        prevState.map((item: { question_id: number; id: number }) =>
          item.question_id === question_id ? { ...item, id } : item
        )
      );
    } else {
      setSelected([...selected, { question_id, id }]);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: theme.background,
            paddingHorizontal: scale(15),
          }}
        >
          <Seperator height={15} />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: scale(16),
              color: theme.text,
              alignSelf: "center",
            }}
          >
            {data?.data?.title}
          </Text>
          <Seperator height={10} />

          <View style={{}}>
            <Text style={{ color: theme.text, fontWeight: "bold" }}>
              Fill in the gap
            </Text>
            {data?.data?.fill_in_the_gap?.map((item: any) => (
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

                <CustomInput placeholder="Answer" />
              </View>
            ))}

            <Seperator height={20} />

            <SingleChoice
              handleSelectOne={handleSelectOne}
              data={data?.data?.filter_quetion_option}
              selected={selected}
            />
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default Job_Question;

const styles = StyleSheet.create({});
