import { useQuery } from "react-query";
import axios from "../../api/axios";

async function getJobsFnc() {
  const response = await axios.get(
    `blob/master/app/screens/Dashboard/MOCK_DATA.json`
    // {
    //   headers: {
    //     "ysu-afriktv-auth-token": extraheaders,
    //   },
    // }
  );
  console.log(response.data);
  return response.data;
}

const getJobs = () =>
  useQuery({
    queryKey: ["getJobs"], // include plan in the queryKey
    queryFn: () => getJobsFnc(), // use a closure to capture the plan variable
  });

export default getJobs;
