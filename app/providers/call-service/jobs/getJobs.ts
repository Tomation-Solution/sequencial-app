import { useQuery } from "react-query";
import axios, { axiosPrivate } from "../../api/axios";
import { retrieveAppData } from "../../../helper_functions/storingAppData";

export async function getJobsFnc() {
  const token = await retrieveAppData("token");

  const response = await axios.get("jobs/job-seeker-view/", {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return response.data;
}

// const getJobs = () =>
//   useQuery({
//     queryKey: ["getJobs"], // include plan in the queryKey
//     queryFn: () => getJobsFnc(), // use a closure to capture the plan variable
//   });

// export default getJobs;
