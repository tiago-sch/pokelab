import { createContext } from "react";
import type { PokedexResponse } from "../../types";

type PokedexContextType = {
  dex: PokedexResponse,
  fetchDex: VoidFunction,
};

const PokedexContext = createContext<PokedexContextType>({
  dex: [],
  fetchDex: () => {},
});

export default PokedexContext;