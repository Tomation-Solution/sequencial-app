import axios from "../../api/axios";

export async function login(email: string, password: string) {
  if (!email || !password) return;

  console.log("email", email);

  const response = await axios.post(`/auth/login/`, {
    email,
    password,
  });

  console.log("response", response.data);

  return response.data;
}
