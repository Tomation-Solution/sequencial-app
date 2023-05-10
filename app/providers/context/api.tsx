import { createContext } from "react";
import { useNotifications } from "../../hooks/app-hooks/useNotification";
import { UseMutationResult, useMutation } from "react-query";
import { login } from "../call-service/auth";

const ApiContext = createContext<{
  useLogin: any;
}>({
  useLogin: () => {},
});

type LoginData = {
  email: string;
  password: string;
};

export const ApiProvider = (props: { children: any }) => {
  const { showNotification } = useNotifications();

  function useLogin(): UseMutationResult<any, unknown, LoginData> {
    return useMutation<any, unknown, LoginData>(
      ["login"],
      (data: LoginData) => login(data.email, data.password),
      {
        onSuccess: () => {
          console.log("success");
          showNotification({
            title: "New Message",
            message: "Login Successful",
          });
        },
        onError: (error) => {
          showNotification({
            title: "New Message",
            message: "Login Failed",
          });
          console.error(error);
        },
      }
    );
  }
  const callActions = {
    useLogin,
  };

  return (
    <ApiContext.Provider value={callActions}>
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiContext;
