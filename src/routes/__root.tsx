import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { ReactLenis } from "lenis/react";
import appCss from "../styles.css?url";
import "lenis/dist/lenis.css";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "HackApp" },
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#EDE7D8] lg:hidden">
					<div className="px-6 text-center">
						<h1 className="mb-4 text-2xl font-bold">Bharat</h1>
						<p className="text-lg">
							This app is in development for small screens. Please use a desktop
							or laptop to access the app.
						</p>
					</div>
				</div>

				<div className="hidden lg:block">
					<ReactLenis root>{children}</ReactLenis>
				</div>

				{/* <TanStackDevtools
					config={{ position: 'bottom-right' }}
					plugins={[
						{ name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> },
						TanStackQueryDevtools,
					]}
				/> */}
				<Scripts />
			</body>
		</html>
	);
}
