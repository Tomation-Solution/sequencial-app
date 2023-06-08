export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
  education_level: string;
  profession: string;
};

export type Education = {
  id: number;
  school_name: string;
  start_year: string;
  end_year: string;
  course_of_study: string;
  degree_type: string;
};

export type WorkExperience = {
  id: number;
  company: string;
  position: string;
  start_year: string;
  end_year: string;
  role: string;
  responsibilities: string;
};

export type Certification = {
  id: number;
  certification: string;
  year: string;
  issuer: string;
};

export type Reference = {
  id: number;
  full_name: string;
  relationship: string;
  email: string;
  phone_number: string;
};

export type UserDetails = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  country_of_residence: string;
  linkdin: string;
  twitter: string;
  personal_statement: string;
};

export type NavButtonProps = {
  id: string;
  title: string;
  _count: number | string;
};
