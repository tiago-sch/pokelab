import { useContext } from "react";
import PokedexContext from ".";

const usePokedex = () => {
  const context = useContext(PokedexContext);

  return context;
};

export default usePokedex;
