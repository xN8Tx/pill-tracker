import { useLogout } from "@/features/user";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const LogoutPage = () => {
  const { mutateAsync } = useLogout();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await mutateAsync();
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onLogout();
  }, []);

  return <></>;
};
