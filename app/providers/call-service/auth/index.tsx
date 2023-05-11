import axios from "../../api/axios";

export async function login(email: string, password: string) {
  if (!email || !password) return;

  const response = await axios.post(`auth/login/`, {
    email,
    password,
  });

  console.log("response", response.data);

  return response.data;
}

export async function register_job_seeker(
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  phone_number: string,
  education_level: string,
  profession: string
) {
  if (!email || !password || !first_name || !last_name || !phone_number) return;

  const response = await axios.post(`auth/create-seeker/`, {
    email,
    password,
    first_name,
    last_name,
    phone_number,
    education_level,
    profession,
  });

  console.log("response", response.data);

  return response.data;
}
