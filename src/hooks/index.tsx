import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPageView } from "../utils/ga";

export const usePageViews = () => {
  let location = useLocation();
  useEffect(() => {
    logPageView(location.pathname);
  }, [location]);
};
