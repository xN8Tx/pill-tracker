import * as React from "react";
import { IsOnlineContext } from "../context";

export const useIsOnline = () => {
  const { isOnline } = React.useContext(IsOnlineContext);
  return isOnline;
};
