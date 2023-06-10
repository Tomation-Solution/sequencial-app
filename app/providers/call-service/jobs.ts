import axios, { axiosPrivate } from "../api/axios";
import { retrieveAppData } from "../../helper_functions/storingAppData";

export async function getJobsFnc() {
  const token = await retrieveAppData("token");

  const response = await axios.get("jobs/job-seeker-view/", {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return response.data;
}

export async function jobApply(data: { job_id: number }) {
  const token = await retrieveAppData("token");

  const response = await axios.post("jobs/job-seeker-view/", data, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return response.data;
}

export async function jobQuestion(data: { job_id: number }) {
  const token = await retrieveAppData("token");

  const response = await axios.post("jobs/job-seeker-view/get_quetion/", data, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });
  return response.data;
}

export async function jobsApplied() {
  const token = await retrieveAppData("token");

  const response = await axios.get(
    "/jobs/job-seeker-dashboard/jobs_applied_for/",
    {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    }
  );
  return response.data;
}

export async function jobsTestScheduled() {
  const token = await retrieveAppData("token");

  const response = await axios.get(
    "jobs/job-seeker-dashboard/jobs_test_scheduled/",
    {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    }
  );
  return response.data;
}

// const getJobs = () =>
//   useQuery({
//     queryKey: ["getJobs"], // include plan in the queryKey
//     queryFn: () => getJobsFnc(), // use a closure to capture the plan variable
//   });

// export default getJobs;
