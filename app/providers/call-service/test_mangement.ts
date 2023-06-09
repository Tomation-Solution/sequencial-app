import { retrieveAppData } from "../../helper_functions/storingAppData";
import axios from "../api/axios";

export async function getTests() {
  const token = await retrieveAppData("token");

  const response = await axios.get("jobs/job-seeker-view/get_list_of_test/", {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return response.data;
}
