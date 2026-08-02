import { INCComponents } from '#/components/inc.tsx';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/explore/$id')({
  component: RouteComponent,
})



function RouteComponent() {
  // const { id } = Route.useParams();
  return <div>
    <INCComponents/>
  </div>
}
