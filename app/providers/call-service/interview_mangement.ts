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

export async function getInterviewFunc(id: number) {
  const token = await retrieveAppData("token");

  const response = await axios.get(
    `interview/job_seeker_manage_invites/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    }
  );
  return response.data;
}

export async function scheduleInterviewFunc(data: {
  available_time: string;
  available_dates: string;
  interview_id: number;
}) {
  const token = await retrieveAppData("token");

  const response = await axios.post(
    "interview/job_seeker_manage_invites/pick_date/",
    data,
    {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    }
  );
  return response.data;
}
