import { type FC } from "react";
import type { PokemonResponse } from "../../types";
import { useCanGoBack, useRouter } from "@tanstack/react-router";

type PokemonDetailsProps = {
  pokemon: PokemonResponse;
}

const PokemonDetails: FC<PokemonDetailsProps> = ({ pokemon }) => {  
  const router = useRouter();
  const canGoBack = useCanGoBack();

  return (
    <div>
      {canGoBack && <button onClick={() => router.history.back()} className="bg-amber-100 p-2">Back</button>}
      <h1>Hello "pokemon" {pokemon.name.replace("-", " ").toUpperCase()}!</h1>
      <img src={pokemon?.sprites.front_default} />
      <hr />
      <h3>Types</h3>
      <ul>
        {pokemon.types.map(type => <li key={`type-${type}`}>{type.replace("-", " ").toUpperCase()}</li>)}
      </ul>
      <hr />
      <h3>Moves</h3>
      <ul>
        {pokemon.moves.map(move => <li key={`type-${move.name}`}>{move.name.replace("-", " ").toLocaleUpperCase()}</li>)}
      </ul>
    </div>
  )
};

export default PokemonDetails;
