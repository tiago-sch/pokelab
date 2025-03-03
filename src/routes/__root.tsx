import { PropsWithChildren } from 'react'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import LoaderProvider from '../contexts/loader/provider';
import PokedexProvider from '../contexts/pokedex/provider';
import PokeInfosProvider from "../contexts/pokeinfos/provider";
import Loader from "../components/Loader";

const AppWrapper = ({ children }: PropsWithChildren) => (
  <LoaderProvider>
    <PokeInfosProvider>
      <PokedexProvider>
        { children }
        <Loader />
      </PokedexProvider>
    </PokeInfosProvider>
  </LoaderProvider>
)

export const Route = createRootRoute({
  component: () => (
    <AppWrapper>
      <div className="container mx-auto p-2 flex gap-2">
        <Link to="/" className="active:font-bold">
          Home
        </Link>{' '}
        <Link to="/pokedex" className="active:font-bold">
          Pokedex
        </Link>
      </div>
      <hr className="pb-10" />
      <main className="container mx-auto">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </AppWrapper>
  ),
})