import { createFileRoute } from "@tanstack/react-router";
import { INCComponents } from "#/components/inc.tsx";

export const Route = createFileRoute("/explore/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<INCComponents />
		</div>
	);
}
