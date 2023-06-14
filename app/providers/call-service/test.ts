import { retrieveAppData } from "../../helper_functions/storingAppData";
import axios from "../api/axios";

export async function testQuestion(data: { test_id: number }) {
  const token = await retrieveAppData("token");

  const response = await axios.post("jobs/job-seeker-view/get_test/", data, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return response.data;
}
