import { API_URL } from "@/shared/constants";
import * as React from "react";

export const IsOnlineContext = React.createContext<{ isOnline: boolean }>(
  {} as { isOnline: boolean },
);

export const IsOnlineProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  const checkOnlineStatus = React.useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/health`, {
        method: "GET",
        cache: "no-cache",
      });

      if (response.ok) {
        setIsOnline(true);
      } else {
        setIsOnline(false);
      }
    } catch (error) {
      setIsOnline(false);
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const intervalId = setInterval(checkOnlineStatus, 15000);

    checkOnlineStatus();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <IsOnlineContext.Provider value={{ isOnline }}>
      {children}
    </IsOnlineContext.Provider>
  );
};
