import { useForm } from "react-hook-form";

const initialState: State = {
  education: [],
  workExperience: [],
  certifications: [],
  references: [],
  userDetails: {
    first_name: "",
    last_name: "",
    middle_name: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    state: "",
    country_of_residence: "",
    linkdin: "",
    twitter: "",
    personal_statement: "",
  },
};

const Home = ({ navigation, route }: { navigation: any; route: any }) => {
  const route_params = route.params;

  const educationRef = useRef<ScrollView>(null);
  const workExperienceRef = useRef<ScrollView>(null);
  const certificationRef = useRef<ScrollView>(null);
  const referenceRef = useRef<ScrollView>(null);

  const theme = useContext(themeContext);
  const { useApiMutation, useApiQuery } = useContext(ApiContext);
  const { showHeaderTextHandler } = React.useContext(HeaderContext);

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<State>({
    defaultValues: initialState,
  });

  const { data, error, refetch, isSuccess, isLoading } = useApiQuery({
    queryKey: "fetchUserData",
    queryFunction: fetch_user_data,
  });

  const uploadCv = useApiMutation({
    mutationFunction: update_job_seeker,
  });

  useEffect(() => {
    if (isSuccess) {
      const userDetails = data?.userDetails || initialState.userDetails;
      setValue("userDetails", userDetails);
      dispatch({ type: "SET_EDUCATION", payload: userDetails.education });
      dispatch({
        type: "SET_WORK_EXPERIENCE",
        payload: userDetails.experience,
      });
      dispatch({
        type: "SET_CERTIFICATIONS",
        payload: userDetails.certificaton,
      });
      dispatch({ type: "SET_REFERENCES", payload: userDetails.refrences });
      dispatch({ type: "SET_USER_DETAILS", payload: userDetails });
    }
  }, [isSuccess, data]);

  const handleFormChange = (text: string, name: string) => {
    setValue(name, text);
  };

  const handleAddEducation = () => {
    const education = control.getValues("education") || [];
    const newEducation = [
      ...education,
      {
        id: education.length + 1,
        school_name: "",
        start_year: "",
        end_year: "",
        course_of_study: "",
        degree_type: "",
      },
    ];
    setValue("education", newEducation);
    setTimeout(() => {
      educationRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleAddWorkExperience = () => {
    const workExperience = control.getValues("workExperience") || [];
    const newWorkExperience = [
      ...workExperience,
      {
        id: workExperience.length + 1,
        company: "",
        position: "",
        start_year: "",
        end_year: "",
        role: "",
        responsibilities: "",
      },
    ];
    setValue("workExperience", newWorkExperience);
    setTimeout(() => {
      workExperienceRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleAddCertification = () => {
    const certifications = control.getValues("certifications") || [];
    const newCertifications = [
      ...certifications,
      {
        id: certifications.length + 1,
        certification: "",
        year: "",
        issuer: "",
      },
    ];
    setValue("certifications", newCertifications);
    setTimeout(() => {
      certificationRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleAddReference = () => {
    const references = control.getValues("references") || [];
    const newReferences = [
      ...references,
      {
        id: references.length + 1,
        full_name: "",
        relationship: "",
        email: "",
        phone_number: "",
      },
    ];
    setValue("references", newReferences);
    setTimeout(() => {
      referenceRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSave = handleSubmit(async (formData) => {
    const __data = {
      ...formData.userDetails,
      education: formData.education,
      experience: formData.workExperience,
      certificaton: formData.certifications,
      refrences: formData.references,
    };

    const _data = new FormData();

    Object.entries(__data).forEach(([key, value]) => {
      _data.append(key, value);
    });

    uploadCv.mutate(_data);
  });

  return (
    <View>
      <ScrollView>
        <View>
          {/* User Details */}
          <Text>First Name</Text>
          <TextInput
            onChangeText={(text) =>
              handleFormChange(text, "userDetails.first_name")
            }
            value={control.getValues("userDetails.first_name") || ""}
          />
          {errors.userDetails?.first_name && (
            <Text>This field is required.</Text>
          )}

          {/* Render other user details fields */}

          {/* Education */}
          {control.getValues("education")?.map((education, index) => (
            <View key={education.id}>{/* Render education fields */}</View>
          ))}

          {/* Work Experience */}
          {control.getValues("workExperience")?.map((experience, index) => (
            <View key={experience.id}>
              {/* Render work experience fields */}
            </View>
          ))}

          {/* Certifications */}
          {control.getValues("certifications")?.map((certification, index) => (
            <View key={certification.id}>
              {/* Render certification fields */}
            </View>
          ))}

          {/* References */}
          {control.getValues("references")?.map((reference, index) => (
            <View key={reference.id}>{/* Render reference fields */}</View>
          ))}

          {/* Save Button */}
          <Button title="Save" onPress={handleSave} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
