import {
  clearAppData,
  retrieveAppData,
} from "../../helper_functions/storingAppData";
import axios from "../api/axios";

export async function delete_profile() {
  const token = await retrieveAppData("token");

  const response = await axios.delete(`auth/users-settings/s/`, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token.access}`,
    },
  });
  clearAppData();

  //   console.log("response", response.data);

  return response.data;
}

export async function change_password(data: any) {
  if (!data) return;

  const token = await retrieveAppData("token");

  const response = await axios.post(
    `auth/users-settings/update_password/`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token.access}`,
      },
    }
  );

  console.log("response", response.data);

  return response.data;
}
