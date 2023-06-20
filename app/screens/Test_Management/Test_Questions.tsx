import React, { memo, useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import ApiContext from "../../providers/context/api";
import {
  jobQuestion,
  submitJobQuestion,
} from "../../providers/call-service/jobs";
import Loading from "../../components/ui/_helpers/Loading";
import themeContext from "../../config/theme/themeContext";
import { scale } from "react-native-size-matters";
import { Button, CustomInput, Text } from "../../components/ui";
import { Seperator } from "../../components/ui/_helpers";
import { useForm } from "react-hook-form";
import SingleChoice from "../../components/app/Questions/SingleChoice";
import {
  submitTestQuestion,
  testQuestion,
} from "../../providers/call-service/test_mangement";
import { useFocusEffect } from "@react-navigation/native";
import { HeaderContext } from "../../providers/context/header";

interface JobQuestionProps {
  navigation: any;
  route: any;
}

interface FormState {
  filter_quetion_option: any[];
  filter_quetion_multi_choice_quetion: any[];
  fill_in_the_gap: any[];
}

const Test_Questions: React.FC<JobQuestionProps> = ({ navigation, route }) => {
  const { test_id } = route.params;
  const theme = useContext(themeContext);
  const { useApiMutation } = useContext(ApiContext);
  const { showHeaderTextHandler } = React.useContext(HeaderContext);

  const [one_selected, setOneSelected] = useState<any>([]);
  const { register, handleSubmit, setValue } = useForm();

  const getQuestions = useApiMutation({
    mutationFunction: testQuestion,
  });

  const submitTestQuestionHandler = useApiMutation({
    mutationFunction: submitTestQuestion,
  });

  useEffect(() => {
    getQuestions.mutate({
      job_id: test_id,
    });
  }, []);

  const handleFillInTheGap = (value: string, id: number, index: number) => {
    setValue(`fill_in_the_gap[${index}]`, {
      id,
      answer: value,
    });
  };

  const handleSelectOne = (value: string, question_id: number, id: number) => {
    setValue(`filter_quetion_option[${id}]`, {
      id: question_id,
      answer: value,
    });

    const isSelected = one_selected.some(
      (item: any) => item.question_id === question_id
    );

    if (isSelected) {
      setOneSelected((prevState: any) =>
        prevState.map((item: any) =>
          item.question_id === question_id ? { ...item, id } : item
        )
      );
    } else {
      setOneSelected([...one_selected, { question_id, id }]);
    }
  };

  const onSubmit = (data: FormState) => {
    const formattedData = {
      job_id: test_id,
      filter_quetion_option: data.filter_quetion_option || [],
      filter_quetion_multi_choice_quetion: [],
      fill_in_the_gap: data.fill_in_the_gap || [],
    };

    console.log("formattedData", formattedData);

    submitTestQuestionHandler.mutate(formattedData);
  };

  useEffect(() => {
    if (submitTestQuestionHandler.isSuccess) {
      navigation.navigate("Home");
    }
  }, [submitTestQuestionHandler.isSuccess]);

  useFocusEffect(
    React.useCallback(() => {
      showHeaderTextHandler("Test Questions");
    }, [])
  );

  return (
    <>
      {getQuestions.isLoading ? (
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
            {getQuestions?.data?.data?.title}
          </Text>
          <Seperator height={10} />

          <View style={{}}>
            <Text style={{ color: theme.text, fontWeight: "bold" }}>
              Fill in the gap
            </Text>
            {getQuestions?.data?.data?.fill_in_the_gap?.map(
              (item: any, index: number) => (
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
                  <Text style={{ color: theme.primary }}>{item?.quetion}</Text>
                  <CustomInput
                    onChangeText={(text) =>
                      handleFillInTheGap(text, item?.id, index)
                    }
                    placeholder="Answer"
                  />
                </View>
              )
            )}

            <Seperator height={20} />

            <SingleChoice
              handleSelectOne={handleSelectOne}
              data={getQuestions?.data?.data?.filter_quetion_option}
              selected={one_selected}
            />
          </View>
          <Seperator height={20} />

          <Button onPress={handleSubmit((data: any) => onSubmit(data))}>
            Submit
          </Button>
          <Seperator height={80} />
        </ScrollView>
      )}
    </>
  );
};

export default memo(Test_Questions);

const styles = StyleSheet.create({});
