import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import appCss from '../styles.css?url'

import type { QueryClient } from '@tanstack/react-query'
import { ReactLenis, useLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'HackApp',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  const lenis = useLenis()

  return (
   <ReactLenis root>
     <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        {/* <TanStackDevtools */}
        {/*   config={{ */}
        {/*     position: 'bottom-right', */}
        {/*   }} */}
        {/*   plugins={[ */}
        {/*     { */}
        {/*       name: 'Tanstack Router', */}
        {/*       render: <TanStackRouterDevtoolsPanel />, */}
        {/*     }, */}
        {/*     TanStackQueryDevtools, */}
        {/*   ]} */}
        {/* /> */}
        <Scripts />
      </body>
    </html>
   </ReactLenis>
  )
}
