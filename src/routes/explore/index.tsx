import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/explore/")({
	component: RouteComponent,
});

function RouteComponent() {
	const events = ["East India Company", "Mughal Empire", "Indian Culture"];
	return (
		<div className="min-h-screen flex items-center justify-center px-6">
			<div className="w-full max-w-md">
				<h1
					className="
					font-serif
					text-4xl
					text-[#20232B]
					mb-10
				"
				>
					Explore the history
				</h1>
				<div className="space-y-4">
					{events.map((event) => (
						<Link
							to="/explore/$id"
							params={{ id: event.toLowerCase().replace(/\s+/g, "-") }}
							key={event}
							className="
								w-full
								text-left
								border-b
								border-[#20232B]/20
								py-5
								flex
								items-center
								justify-between
								group
							"
						>
							<span
								className="
								font-serif
								text-2xl
								text-[#20232B]
							"
							>
								{event}
							</span>

							<span
								className="
								font-mono
								text-xs
								text-[#8A4036]
								opacity-0
								group-hover:opacity-100
								transition
							"
							>
								→
							</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
