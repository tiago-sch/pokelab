import { PropsWithChildren, useEffect, useMemo, useState } from "react"; 
import PokeInfosContext from ".";
import { fetchInfos } from "../../services";
import { PokeInfosResponse } from "../../types";
import useLoader from "../loader/useLoader";

const PokeInfosProvider = ({ children }: PropsWithChildren) => {
  const { setLoading } = useLoader("infos");
  const [infosResponse, setInfosResponse] = useState<PokeInfosResponse>({
    types: []
  });

  useEffect(() => {
    setLoading(true);
    fetchInfos().then(data => {
      setInfosResponse(data);
      setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = useMemo(() => ({
    ...infosResponse,
    fetchInfos,
  }), [infosResponse])

  return (
    <PokeInfosContext.Provider value={values}>
      {children}
    </PokeInfosContext.Provider>
  )
};

export default PokeInfosProvider;
