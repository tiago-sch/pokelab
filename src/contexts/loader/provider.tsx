import { PropsWithChildren, useCallback, useMemo, useState } from "react"; 
import LoaderContext from ".";

const LoaderProvider = ({ children }: PropsWithChildren) => {
  const [loaders, setLoaders] = useState<Record<string, boolean>>({});

  const isLoading = useMemo(
    () => Object.values(loaders).some(value => !!value),
    [loaders]
  );

  const setLoading = useCallback((location: string, loading: boolean) => {
    setLoaders(state => ({
      ...state,
      [location]: loading,  
    }));
  }, [setLoaders]);

  const values = useMemo(() => ({
    isLoading,
    setLoading
  }), [isLoading, setLoading])

  return (
    <LoaderContext.Provider value={values}>
      {children}
    </LoaderContext.Provider>
  )
};

export default LoaderProvider;
