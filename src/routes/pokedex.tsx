import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import PokedexList from "../components/PokedexList";
import usePokedex from '../contexts/pokedex/usePokedex';

export const Route = createFileRoute('/pokedex')({
  component: RouteComponent,
})

function RouteComponent() {
  const { dex, fetchDex } = usePokedex();

  useEffect(() => {
    if (!dex.length) {
      fetchDex();
    }
  }, [dex.length, fetchDex]); 

  return (
    <div>
      <h2 className="text-center font-bold text-lg py-5">POKE-DEX</h2>
      <PokedexList />
    </div>
  )
}
