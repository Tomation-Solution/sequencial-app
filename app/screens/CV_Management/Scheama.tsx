import * as Yup from "yup";

export const CVScheama = Yup.object().shape({
  userDetails: Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    middle_name: Yup.string(),
    email: Yup.string().required("Email is required").email("Invalid email"),
    phone_number: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country_of_residence: Yup.string().required(
      "Country of residence is required"
    ),
    linkdin: Yup.string(),
    twitter: Yup.string(),
    personal_statement: Yup.string().required("Personal statement is required"),
  }),

  education: Yup.array().of(
    Yup.object().shape({
      school_name: Yup.string().required("School name is required"),
      start_year: Yup.string().required("Start year is required"),
      end_year: Yup.string().required("End year is required"),
      course_of_study: Yup.string().required("Course of study is required"),
      degree_type: Yup.string().required("Degree type is required"),
    })
  ),

  workExperience: Yup.array().of(
    Yup.object().shape({
      company: Yup.string().required("Company is required"),
      position: Yup.string().required("Position is required"),
      start_year: Yup.string().required("Start year is required"),
      end_year: Yup.string().required("End year is required"),
      role: Yup.string().required("Role is required"),
      responsibilities: Yup.string().required("Responsibilities is required"),
    })
  ),

  certifications: Yup.array().of(
    Yup.object().shape({
      certification: Yup.string().required("Certification is required"),
      year: Yup.string().required("Year is required"),
      issuer: Yup.string().required("Issuer is required"),
    })
  ),

  references: Yup.array().of(
    Yup.object().shape({
      full_name: Yup.string().required("Full name is required"),
      relationship: Yup.string().required("Relationship is required"),
      email: Yup.string().required("Email is required"),
      phone_number: Yup.string().required("Phone number is required"),
    })
  ),
});
