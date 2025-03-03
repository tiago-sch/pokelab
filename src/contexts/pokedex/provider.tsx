import { PropsWithChildren, useCallback, useMemo, useState } from "react"; 
import PokedexContext from ".";
import useLoader from "../loader/useLoader";
import { fetchPokedex } from "../../services";
import { PokedexResponse } from "../../types";

const PokedexProvider = ({ children }: PropsWithChildren) => {
  const { setLoading } = useLoader("pokedex");
  const [pokedex, setPokedex] = useState<PokedexResponse>([]);

  const fetchDex = useCallback(() => {
    setLoading(true);
    fetchPokedex("1025").then(data => {
      setPokedex(data);
      setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const values = useMemo(() => ({
    dex: pokedex,
    fetchDex
  }), [fetchDex, pokedex])

  return (
    <PokedexContext.Provider value={values}>
      {children}
    </PokedexContext.Provider>
  )
};

export default PokedexProvider;
