import { Pause, Play, Sparkles, Volume2, X } from "lucide-react";
import { useEffect } from "react";
import type { MuseumSection } from "#/lib/gallery-data.ts";
import { useNarration } from "../hooks/useNarration";

type Props = {
	section: MuseumSection;
	onClose: () => void;
};

export function ExploreModal({ section, onClose }: Props) {
	const narration = useNarration();
	const isPlaying =
		narration.activeId === section.id && narration.state === "playing";
	const isPaused =
		narration.activeId === section.id && narration.state === "paused";

	useEffect(() => {
		const original = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				narration.stop();
				onClose();
			}
		};
		window.addEventListener("keydown", handleKey);
		return () => {
			document.body.style.overflow = original;
			window.removeEventListener("keydown", handleKey);
			narration.stop();
		};
	}, [narration.stop, onClose]);

	const handleClose = () => {
		narration.stop();
		onClose();
	};

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-8 museum-fade-in">
			<button
				type="button"
				aria-label="Close dialog"
				onClick={handleClose}
				className="absolute inset-0 cursor-default bg-transparent"
			/>
			<div
				role="dialog"
				aria-modal="true"
				aria-label={section.title}
				className="relative grid max-h-[92vh] w-full max-w-6xl grid-cols-1 overflow-hidden rounded-3xl bg-[#f5efe4] shadow-2xl md:grid-cols-2"
				style={{
					animation: "museum-fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
				}}
			>
				<button
					type="button"
					onClick={handleClose}
					className="absolute right-5 top-5 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 text-white shadow-md transition hover:bg-neutral-800"
				>
					<X size={18} />
				</button>

				<div
					className="relative min-h-[280px] overflow-hidden md:min-h-full"
					style={{ background: section.accent }}
				>
					<img
						src={section.imageUrl}
						alt={section.title}
						className="museum-ken h-full w-full object-cover"
						onError={(e) => {
							e.currentTarget.style.display = "none";
						}}
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
					<div className="absolute bottom-6 left-6 flex items-center gap-3 text-white">
						<span className="rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-800 shadow-md">
							{section.number} / Gallery
						</span>
					</div>
				</div>

				<div className="flex max-h-[92vh] flex-col overflow-y-auto p-8 sm:p-12">
					<p
						className="mb-4 text-[10px] font-medium uppercase tracking-[0.4em]"
						style={{ color: section.accent }}
					>
						{section.subtitle}
					</p>
					<h2
						className="mb-4 text-4xl font-bold leading-tight text-neutral-900 sm:text-5xl"
						style={{ fontFamily: "'Playfair Display', serif" }}
					>
						{section.title}
					</h2>
					<div
						className="mb-6 h-[3px] w-14 rounded-full"
						style={{ background: section.accent }}
					/>

					<p className="mb-6 text-lg font-medium leading-relaxed text-neutral-800">
						{section.description}
					</p>
					<p className="mb-8 text-base leading-relaxed text-neutral-600">
						{section.longDescription}
					</p>

					<div className="mb-8 rounded-2xl border border-neutral-200 bg-white/70 p-4">
						<div className="mb-3 flex flex-wrap items-center gap-3">
							<button
								type="button"
								onClick={() =>
									narration.toggle(section.id, section.narrationText)
								}
								className={`flex items-center gap-3 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] transition ${
									isPlaying
										? "text-black"
										: "bg-neutral-900 text-white hover:bg-neutral-800"
								}`}
								style={isPlaying ? { background: section.accent } : undefined}
							>
								{isPlaying ? (
									<Pause size={13} />
								) : (
									<Play size={13} className="ml-0.5" />
								)}
								{isPlaying ? "Pause" : isPaused ? "Resume" : "Listen to Story"}
							</button>

							<div className="flex items-center gap-2 text-xs text-neutral-600">
								<Volume2 size={13} style={{ color: section.accent }} />
								<span className="uppercase tracking-[0.2em]">Speed</span>
								<div className="flex gap-1">
									{[0.85, 1.0, 1.2].map((r) => (
										<button
											key={r}
											type="button"
											onClick={() => narration.setRate(r)}
											className={`rounded-full px-2 py-0.5 text-[10px] font-semibold transition ${
												narration.rate === r
													? "bg-neutral-900 text-white"
													: "bg-white text-neutral-600 ring-1 ring-neutral-200"
											}`}
										>
											{r}×
										</button>
									))}
								</div>
							</div>

							{(isPlaying || isPaused) && (
								<span
									className="ml-auto flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em]"
									style={{ color: section.accent }}
								>
									<span className="relative flex h-2 w-2">
										<span
											className="absolute inline-flex h-full w-full rounded-full opacity-75 museum-ping"
											style={{ background: section.accent }}
										/>
										<span
											className="relative inline-flex h-2 w-2 rounded-full"
											style={{ background: section.accent }}
										/>
									</span>
									{isPlaying ? "Narrating" : "Paused"}
								</span>
							)}
						</div>
					</div>

					<div className="mb-8 grid grid-cols-1 gap-3">
						{section.facts.map((fact) => (
							<div
								key={fact.label}
								className="rounded-2xl border border-neutral-200 bg-white p-4 transition hover:border-neutral-400"
							>
								<h4
									className="mb-1 text-[10px] font-semibold uppercase tracking-[0.25em]"
									style={{ color: section.accent }}
								>
									{fact.label}
								</h4>
								<p className="text-sm text-neutral-800">{fact.value}</p>
							</div>
						))}
					</div>

					<div className="mb-8 flex flex-wrap gap-2">
						{section.tags.map((tag) => (
							<span
								key={tag}
								className="rounded-full border border-neutral-300 bg-white/50 px-3.5 py-1.5 text-xs text-neutral-700"
							>
								{tag}
							</span>
						))}
					</div>

					<div className="mt-auto flex items-center justify-between border-t border-neutral-200 pt-6">
						<p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-neutral-400">
							<Sparkles size={12} />
							Press ESC or click outside
						</p>
						<button
							type="button"
							onClick={handleClose}
							className="rounded-full bg-neutral-900 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-neutral-800"
						>
							Back to Tour
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
