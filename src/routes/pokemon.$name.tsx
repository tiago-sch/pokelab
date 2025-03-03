import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { PokemonResponse } from '../types';
import { fetchPokemon } from '../services';
import useLoader from '../contexts/loader/useLoader';
import PokemonDetails from '../components/PokemonDetails';

export const Route = createFileRoute('/pokemon/$name')({
  component: RouteComponent,
})

function RouteComponent() {
  const { name } = Route.useParams();
  const [pokemon, setPokemon] = useState<PokemonResponse | undefined>();
  const { setLoading } = useLoader("pokemonDetails");

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

  return <PokemonDetails pokemon={pokemon} />
}
