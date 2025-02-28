import { useCallback, useContext } from "react";
import LoaderContext from "./";

const useLoader = (location: string) => {
  const loaderContext = useContext(LoaderContext);

  const setLoading = useCallback((loading: boolean) => {
    loaderContext.setLoading(location, loading);
  }, [loaderContext, location]);

  return {
    isLoading: loaderContext.isLoading,
    setLoading,
  }
};

export default useLoader;
