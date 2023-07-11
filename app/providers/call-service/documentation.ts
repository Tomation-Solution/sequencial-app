import { retrieveAppData } from "../../helper_functions/storingAppData";
import axios from "../api/axios";

export async function getDocsFnc() {
  const token = await retrieveAppData("token");

  const response = await axios.get(
    "/jobs/jobseeker-application-process/?final_selection_state=selected",
    {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    }
  );
  return response.data;
}

export async function acceptOfferFunc(data: { job_applicant_id: number }) {
  const token = await retrieveAppData("token");

  const response = await axios.post(
    "jobs/jobseeker-application-process/accept_offer/",
    data,
    {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    }
  );
  return response.data;
}

export async function fileUploadFunc(data: any) {
  const token = await retrieveAppData("token");

  const response = await axios.post(
    "jobs/jobseeker-application-process/accept_offer/",
    data,
    {
      headers: {
        Authorization: `Bearer ${token.access}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
}
