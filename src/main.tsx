import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { HeroUIProvider } from "@heroui/react";
import "./styles.css";

import { routeTree } from './routeTree.gen'

const router = createRouter({ 
  routeTree,
  defaultNotFoundComponent: () => {
    return (
      <div>
        <p>Not found! 🪤</p>
      </div>
    )
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <HeroUIProvider>
        <RouterProvider router={router} />
      </HeroUIProvider>
    </StrictMode>,
  )
}
