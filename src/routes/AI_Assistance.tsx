import { ChatBot } from '#/components/AI_Assistance'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/AI_Assistance')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ChatBot/>
}