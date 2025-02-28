import { createContext } from "react";

type LoaderContextType = {
  isLoading: boolean;
  setLoading: (location: string, loading: boolean) => void;
};

const LoaderContext = createContext<LoaderContextType>({
  isLoading: false,
  setLoading: () => {}
});

export default LoaderContext;