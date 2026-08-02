import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/explore/")({
	component: RouteComponent,
});

function RouteComponent() {
	const events = ["East India Company", "Mughal Empire", "Indian Culture"];

	return (
		<div className="relative min-h-screen w-full bg-[#faf9f6] px-6 text-stone-900 sm:px-10">
			<div className="absolute right-6 top-6 sm:right-10 sm:top-10">
				<Link
					to="/home"
					className="group flex items-center gap-2 rounded-full border px-4 py-2 text-xs"
				>
					Back
				</Link>
			</div>

			<div className="pt-24 sm:pt-20">
				<h1 className="font-boska text-[18vw] font-bold leading-[0.8] tracking-tight text-stone-900 sm:text-[16vw]">
					The History
				</h1>
			</div>

			<div className="mt-20 max-w-5xl pb-20 sm:mt-28">
				{events.map((event, i) => {
					const comingSoon = i > 0;

					return (
						<Link
							key={event}
							to="/explore/$id"
							params={{
								id: event.toLowerCase().replace(/\s+/g, "-"),
							}}
							className={`group flex items-center border-t border-stone-300/70 py-6 transition-all duration-300 sm:py-8 ${
								comingSoon ? "cursor-default" : "hover:px-3"
							}`}
							onClick={(e) => {
								if (comingSoon) {
									e.preventDefault();
								}
							}}
						>
							{/* Number */}
							<span className="w-10 shrink-0 font-mono text-xs text-stone-400 sm:w-14">
								0{i + 1}
							</span>

							{/* Title */}
							<span
								className={`flex-1 font-boska text-4xl font-medium tracking-tight sm:text-6xl ${
									comingSoon
										? "text-stone-400"
										: "text-stone-800 group-hover:text-stone-950"
								}`}
							>
								{event}
							</span>

							{/* Status / Arrow */}
							<span className="ml-4 flex items-center gap-3">
								{comingSoon ? (
									<span className="rounded-full border border-stone-200 bg-stone-100 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-stone-400">
										Coming soon
									</span>
								) : (
									<span className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 transition-all duration-300 group-hover:border-stone-900 group-hover:bg-stone-900 group-hover:text-white">
										<span className="transition-transform duration-300 group-hover:translate-x-0.5">
											→
										</span>
									</span>
								)}
							</span>
						</Link>
					);
				})}

				<div className="border-t border-stone-300/70" />
			</div>
		</div>
	);
}
