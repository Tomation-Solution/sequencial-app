interface Education {
  id: number;
  school_name: string;
  start_year: string;
  end_year: string;
  course_of_study: string;
  degree_type: string;
}

interface WorkExperience {
  id: number;
  company: string;
  position: string;
  start_year: string;
  end_year: string;
  role: string;
  responsibilities: string;
}

interface Certification {
  id: number;
  certification: string;
  year: string;
  issuer: string;
}

interface Reference {
  id: number;
  full_name: string;
  relationship: string;
  email: string;
  phone_number: string;
}

interface UserDetails {
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  country_of_residence: string;
  linkdin: string;
  twitter: string;
  personal_statement: string;
  skills: string;
  [key: string]: string;
}

interface State {
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  phone_number: string;
  addresse: string;
  city: string;
  state: string;
  country_of_residence: string;
  linkdin: string;
  twitter: string;
  personal_statement: string;
  skills: string;
  education: Education[];
  experience: WorkExperience[];
  certificaton: Certification[];
  refrences: Reference[];
  [key: string]:
    | string
    | Education[]
    | WorkExperience[]
    | Certification[]
    | Reference[];
}

export {
  Education,
  WorkExperience,
  Certification,
  Reference,
  UserDetails,
  State,
};

export type Action =
  | { type: "SET_EDUCATION"; payload: Education[] }
  | { type: "SET_WORK_EXPERIENCE"; payload: WorkExperience[] }
  | { type: "SET_CERTIFICATIONS"; payload: Certification[] }
  | { type: "SET_REFERENCES"; payload: Reference[] }
  | { type: "SET_USER_DETAILS"; payload: UserDetails }
  | { type: "ADD_EDUCATION" }
  | { type: "ADD_WORK_EXPERIENCE" }
  | { type: "ADD_CERTIFICATIONS" }
  | { type: "ADD_REFERENCES" };
