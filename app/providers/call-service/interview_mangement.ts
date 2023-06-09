import { retrieveAppData } from "../../helper_functions/storingAppData";
import axios from "../api/axios";

export async function getInterviews() {
  const token = await retrieveAppData("token");

  const response = await axios.get("interview/job_seeker_manage_invites/", {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return response.data;
}
