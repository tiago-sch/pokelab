import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/pokemon/$name')({
  component: RouteComponent,
})

function RouteComponent() {
  const { name } = Route.useParams()

  return <div>Hello "pokemon" {name}!</div>
}
