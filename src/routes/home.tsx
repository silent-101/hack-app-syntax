import { createFileRoute } from "@tanstack/react-router";
import { HomeUI } from "#/components/Home.tsx";

export const Route = createFileRoute("/home")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="">
			<HomeUI />
		</div>
	);
}
