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

export async function testQuestion(data: { test_id: number }) {
  const token = await retrieveAppData("token");

  const response = await axios.post("jobs/job-seeker-view/get_test/", data, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return response.data;
}

export async function submitTestQuestion(data: any) {
  const token = await retrieveAppData("token");

  const response = await axios.post("jobs/job-seeker-view/submit_test/", data, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return response.data;
}
