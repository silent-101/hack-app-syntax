import { createFileRoute, Link } from "@tanstack/react-router";
import { Gallery } from "#/components/gallery.tsx";

export const Route = createFileRoute("/gallery")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="relative">
			<div className="absolute left-6 top-6 w-fit z-[999]">
				<Link
					to="/home"
					className="group flex items-center border-white text-stone-50 gap-2 rounded-full border px-4 py-2 text-xs"
				>
					Back
				</Link>
			</div>
			<Gallery />
		</div>
	);
}
