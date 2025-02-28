import { useContext } from "react";
import PokeInfosContext from ".";

const usePokeInfos = () => {
  const context = useContext(PokeInfosContext);

  return context;
};

export default usePokeInfos;
