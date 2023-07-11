import { ScrollView, StyleSheet, View } from "react-native";
import React, { useContext, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { HeaderContext } from "../../providers/context/header";
import { Button, Text } from "../../components/ui";
import { Seperator } from "../../components/ui/_helpers";
import { scale } from "react-native-size-matters";
import themeContext from "../../config/theme/themeContext";
import ApiContext from "../../providers/context/api";
import { acceptOfferFunc } from "../../providers/call-service/documentation";

const Details = ({ navigation, route }: { navigation: any; route: any }) => {
  const { doc_obj } = route.params;
  const { showHeaderTextHandler } = React.useContext(HeaderContext);
  const theme = useContext(themeContext);
  const { useApiMutation } = useContext(ApiContext);

  const acceptOffer = useApiMutation({
    mutationFunction: acceptOfferFunc,
  });

  const handleAcceptOffer = () => {
    acceptOffer.mutate({
      job_applicant_id: doc_obj?.id,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      showHeaderTextHandler("Job Offer Details");
    }, [])
  );

  useEffect(() => {
    if (acceptOffer.isSuccess) {
      navigation.navigate("Document_Upload", {
        doc_obj,
      });
    }
  }, [acceptOffer.isSuccess]);

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          paddingTop: 20,
          paddingHorizontal: 18,
          alignItems: "center",
        }}
      >
        <Seperator height={20} />
        <Text
          style={{
            fontSize: scale(30),
            fontWeight: "bold",
          }}
        >
          Congrats
        </Text>
        <Seperator height={20} />

        <View>
          <Text
            style={{
              textAlign: "justify",
            }}
          >
            <Text style={styles.heading}>
              Congratulations on joining {doc_obj?.company?.name}!
            </Text>
            {"\n\n"}
            <Text>
              We are thrilled to have you as a new member of our team. Your
              skills and experience make you an excellent fit for your new role,{" "}
              {doc_obj?.company?.job_title}, and we are confident that you will
              contribute to our continued success.
            </Text>
            {"\n\n"}
            <Text>
              At {doc_obj?.company?.name}, we strive for excellence, innovation,
              and collaboration. We believe that your expertise will greatly
              enhance our team and help us achieve our goals. We are excited to
              see the fresh perspectives and ideas you will bring to the table.
            </Text>
            {"\n\n"}
            <Text>
              As you embark on this new journey with us, we want to extend our
              warmest welcome. We have a supportive and inclusive work
              environment that values teamwork and personal growth. You will
              find that our team is dedicated, talented, and passionate about
              what we do.
            </Text>
            {"\n\n"}
            <Text>
              Please take the time to get to know your colleagues and
              familiarize yourself with our company culture. We encourage you to
              engage with your teammates, ask questions, and share your
              insights. Together, we can accomplish great things.
            </Text>
            {"\n\n"}
            <Text>
              As you settle into your new role, remember that we are here to
              support you every step of the way. If you have any questions,
              concerns, or need assistance, please do not hesitate to reach out
              to your manager or the HR department.
            </Text>
            {"\n\n"}
            <Text>
              Once again, congratulations on joining {doc_obj?.company?.name}.
              We believe that your contributions will make a significant impact,
              and we look forward to a successful and rewarding journey
              together.
            </Text>
            {"\n\n"}

            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              {doc_obj?.company?.name}
            </Text>
          </Text>
        </View>
      </View>
      <Seperator height={20} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          onPress={handleAcceptOffer}
          styles={{
            marginHorizontal: 18,
            backgroundColor: doc_obj?.accept_application
              ? theme.placeholder
              : theme.primary,
          }}
          disabled={acceptOffer.isLoading}
        >
          Accept Offer
        </Button>
        <Seperator width={20} />
        <Button
          styles={{
            marginHorizontal: 18,
            backgroundColor: theme.background,
            borderWidth: 1,
            borderColor: theme.primary,
          }}
          textStyles={{
            color: theme.primary,
          }}
          disabled={doc_obj?.accept_application}
        >
          Reject Offer
        </Button>
      </View>
      <Seperator height={20} />
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
