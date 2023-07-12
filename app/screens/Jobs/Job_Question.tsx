import React, {
  memo,
  useContext,
  useEffect,
  useState,
  useReducer,
} from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
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
import SingleChoice from "../../components/app/Questions/SingleChoice";
import { useForm } from "react-hook-form";
import { HeaderContext } from "../../providers/context/header";
import { useFocusEffect } from "@react-navigation/native";

interface JobQuestionProps {
  navigation: any;
  route: any;
}

interface FormState {
  filter_quetion_option: any[];
  filter_quetion_multi_choice_quetion: any[];
  fill_in_the_gap: any[];
}

const Job_Question: React.FC<JobQuestionProps> = ({ navigation, route }) => {
  const { job_id } = route.params;
  const theme = useContext(themeContext);
  const { useApiMutation } = useContext(ApiContext);
  const { showHeaderTextHandler } = React.useContext(HeaderContext);

  const [one_selected, setOneSelected] = useState<any>([]);
  // const { register, handleSubmit, setValue } = useForm();

  const [formState, setFormState] = useState<FormState>({
    filter_quetion_option: [],
    filter_quetion_multi_choice_quetion: [],
    fill_in_the_gap: [],
  });

  const getQuestions = useApiMutation({
    mutationFunction: jobQuestion,
  });

  const submitJobQuestionHandler = useApiMutation({
    mutationFunction: submitJobQuestion,
  });

  useEffect(() => {
    getQuestions.mutate({
      job_id,
    });
  }, []);

  const handleFillInTheGap = (value: string, id: number, index: number) => {
    // setValue(`fill_in_the_gap[${index}]`, {
    //   id,
    //   answer: value,
    // });
    setFormState((prevState) => ({
      ...prevState,
      fill_in_the_gap: [...prevState.fill_in_the_gap, { id, answer: value }],
    }));
  };

  const handleSelectOne = (value: string, question_id: number, id: number) => {
    // setValue(`filter_quetion_option[${question_id}]`, {
    //   id: question_id,
    //   answer: value,
    // });

    if (
      formState.filter_quetion_option.filter((item) => item.id === question_id)
        .length > 0
    ) {
      setFormState((prevState) => ({
        ...prevState,
        filter_quetion_option: prevState.filter_quetion_option.map((item) =>
          item.id === question_id ? { id: question_id, answer: value } : item
        ),
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        filter_quetion_option: [
          ...prevState.filter_quetion_option,
          { id: question_id, answer: value },
        ],
      }));
    }

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

  const onSubmit = () => {
    const formattedData = {
      job_id,
      filter_quetion_option: formState.filter_quetion_option || [],
      filter_quetion_multi_choice_quetion: [],
      fill_in_the_gap: formState.fill_in_the_gap || [],
    };

    // console.log("formattedData", formState);

    submitJobQuestionHandler.mutate(formattedData);
  };

  useEffect(() => {
    if (submitJobQuestionHandler.isSuccess) {
      navigation.navigate("Job_Details", { job_id });
    }
  }, [submitJobQuestionHandler.isSuccess]);

  useFocusEffect(
    React.useCallback(() => {
      showHeaderTextHandler("Job Question");
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

          <Button onPress={onSubmit}>Submit</Button>
          <Seperator height={80} />
        </ScrollView>
      )}
    </>
  );
};

export default memo(Job_Question);

const styles = StyleSheet.create({});
