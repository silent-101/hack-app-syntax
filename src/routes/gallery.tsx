import { Gallery } from '#/components/gallery.tsx';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/gallery')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Gallery/>
  )
}
