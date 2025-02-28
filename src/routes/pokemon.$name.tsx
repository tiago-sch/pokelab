import { createFileRoute, useCanGoBack, useNavigate, useRouter } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { PokemonResponse } from '../types';
import { fetchPokemon } from '../services';
import useLoader from '../contexts/loader/useLoader';

export const Route = createFileRoute('/pokemon/$name')({
  component: RouteComponent,
})

function RouteComponent() {
  const { name } = Route.useParams();
  const [pokemon, setPokemon] = useState<PokemonResponse | undefined>();
  const { setLoading } = useLoader("pokemonDetails");

  const router = useRouter();
  const canGoBack = useCanGoBack();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchPokemon(name).then(pokeData => {
      setLoading(false);

      if ("error" in pokeData) {
        navigate({ to: "/pokedex" });
        return
      }

      setPokemon(pokeData);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  if (!pokemon) {
    return null;
  }

  // DATA MOCK
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
}
