import { ArrowRight } from "lucide-react";
import type { MuseumSection } from "#/lib/gallery-data.ts";

type Props = {
	section: MuseumSection;
	active: boolean;
	onExplore: (s: MuseumSection) => void;
};

export function SectionSlide({ section, active, onExplore }: Props) {
	return (
		<div
			className="relative flex h-full w-screen shrink-0 overflow-hidden"
			style={{ background: section.accent }}
		>
			<img
				src={section.imageUrl}
				alt={section.title}
				className={`absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ${
					active ? "scale-100" : "scale-105"
				}`}
				onError={(e) => {
					e.currentTarget.style.display = "none";
				}}
			/>
			<div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/30" />
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

			<div
				className={`relative z-50 flex h-full w-full flex-col justify-end px-6 pb-24 pt-32 sm:px-16 md:pb-28 md:pt-40 lg:px-24 ${
					active ? "museum-slide-content" : ""
				}`}
			>
				<div className="max-w-2xl text-white">
					<h2 className="mb-4 text-5xl font-boska font-bold leading-[0.95] sm:text-7xl md:text-8xl">
						{section.title}
					</h2>
					<p className="mb-5 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
						{section.description}
					</p>

					<div className="mb-7 flex flex-wrap gap-2">
						{section.tags.map((tag) => (
							<span
								key={tag}
								className="museum-tag rounded-full border border-white/25 bg-white/[0.04] px-4 py-1.5 text-xs text-white/85 backdrop-blur-sm"
							>
								{tag}
							</span>
						))}
					</div>

					<button
						type="button"
						onClick={() => onExplore(section)}
						className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-900 shadow-xl transition hover:bg-neutral-100"
					>
						Explore More
						<span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-white transition-transform group-hover:translate-x-0.5">
							<ArrowRight size={11} />
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}
