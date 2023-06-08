import { retrieveAppData } from "../../helper_functions/storingAppData";
import axios from "../api/axios";

export async function getDashBoardSummary() {
  const token = await retrieveAppData("token");

  const response = await axios.get(
    "jobs/job-seeker-dashboard/dashboard_summary/",
    {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    }
  );
  return response.data;
}
