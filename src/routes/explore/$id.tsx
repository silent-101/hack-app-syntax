import { createFileRoute, Link } from "@tanstack/react-router";
import { INCComponents } from "#/components/inc.tsx";

export const Route = createFileRoute("/explore/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="relative">
			<div className="absolute right-6 top-6 sm:right-10 sm:top-10 z-40">
				<Link
					to="/explore"
					className="group flex items-center gap-2 border rounded-full px-4 py-2 text-xs"
				>
					Back
				</Link>
			</div>
			<INCComponents />
		</div>
	);
}
