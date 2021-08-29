import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPageView } from "../utils/ga";

export const usePageViews = () => {
  let location = useLocation();
  useEffect(() => {
    if (location.pathname.substring(1)) {
      document.title = `${location.pathname.substring(1)} - Company`;
    } else {
      document.title = "Company";
    }

    logPageView(location.pathname);
  }, [location]);
};
