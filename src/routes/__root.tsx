import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/pokedex" className="[&.active]:font-bold">
          Pokedex
        </Link>{' '}
        <Link to="/pokemon/$name" params={{ name: "bulbasaur" }} className="[&.active]:font-bold">
          Bulbasaur
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})