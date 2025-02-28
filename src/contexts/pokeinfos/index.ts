import { createContext } from "react";
import type { PokeInfosResponse } from "../../types";

type PokeInfosContextType = PokeInfosResponse;

const PokeInfosContext = createContext<PokeInfosContextType>({
  types: []
});

export default PokeInfosContext;