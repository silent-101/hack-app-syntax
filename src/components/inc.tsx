import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import { stops } from "#/lib/timeline-data.ts";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, useGSAP);

const VIEWBOX_W = 491;
const VIEWBOX_H = 1949;
const STROKE_WIDTH = 1;
const DASH = "13 13";

const PATH_D =
	"M418 0 C395 4 362 14 332 30 C295 50 258 75 224 108 C190 140 171 178 164 220 C156 274 164 326 178 372 C194 425 238 454 295 480 C347 504 398 528 432 560 C462 590 475 640 474 710 C473 785 445 835 398 882 C354 926 295 950 238 976 C185 1000 136 1040 96 1098 C55 1158 22 1222 18 1288 C15 1355 42 1415 72 1470 C102 1525 160 1560 235 1590 C300 1616 355 1632 392 1668 C428 1704 424 1760 392 1812 C354 1872 282 1914 74 1949";

const CARD_WIDTH = 224;
const CARD_GAP = 72;

type MarkerPoint = {
	xPct: number;
	yPct: number;
	side: "left" | "right";
};

function getCardTopOffset(index: number) {
	return index % 2 === 0 ? -72 : 20;
}

export function INCComponents() {
	const containerRef = useRef<HTMLDivElement>(null);
	const pathRef = useRef<SVGPathElement>(null);
	const maskPathRef = useRef<SVGPathElement>(null);
	const markerRefs = useRef<(HTMLDivElement | null)[]>([]);
	const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
	const [points, setPoints] = useState<MarkerPoint[]>([]);

	useLayoutEffect(() => {
		const path = pathRef.current;
		if (!path) return;

		const totalLength = path.getTotalLength();

		const sampled: MarkerPoint[] = stops.map((_, i) => {
			const t = i / (stops.length - 1);
			const { x, y } = path.getPointAtLength(t * totalLength);

			const side =
				i === stops.length - 1 ? "left" : i % 2 === 0 ? "right" : "left";

			return {
				xPct: (x / VIEWBOX_W) * 100,
				yPct: (y / VIEWBOX_H) * 100,
				side,
			};
		});

		setPoints(sampled);
	}, []);

	useGSAP(
		() => {
			const maskPath = maskPathRef.current;
			const container = containerRef.current;
			const lastMarker = markerRefs.current[markerRefs.current.length - 1];

			if (!maskPath || !container || !lastMarker || points.length === 0) return;

			gsap.set(maskPath, { drawSVG: "0%" });

			gsap.to(maskPath, {
				drawSVG: "100%",
				ease: "none",
				scrollTrigger: {
					trigger: container,
					start: "top 85%",
					endTrigger: lastMarker,
					end: "center center",
					scrub: true,
				},
			});

			itemRefs.current.forEach((el) => {
				if (!el) return;

				gsap.fromTo(
					el,
					{
						opacity: 0.25,
						filter: "grayscale(1)",
						y: 12,
					},
					{
						opacity: 1,
						filter: "grayscale(0)",
						y: 0,
						ease: "power1.out",
						scrollTrigger: {
							trigger: el,
							start: "top 75%",
							end: "top 45%",
							scrub: true,
						},
					},
				);
			});
		},
		{
			dependencies: [points],
			scope: containerRef,
		},
	);

	return (
		<div className="w-full overflow-hidden bg-[#EDE7D8] text-[#20232B]">
			<section className="relative flex min-h-screen flex-col justify-center px-6 py-24 md:px-12">
				<div className="mx-auto w-full max-w-6xl">
					<div className="mb-8 flex items-center gap-4">
						<p className="font-mono text-xs uppercase tracking-[0.3em] text-[#7A2E2E]">
							1757 — 1947
						</p>
					</div>

					{/* Main heading */}
					<h1 className="max-w-5xl font-serif text-[13vw] font-medium leading-[0.82] tracking-[-0.045em] text-[#20232B] md:text-[10vw] lg:text-[8.5rem]">
						The Long
						<br />
						<span className="ml-[8vw] italic text-[#7A2E2E] md:ml-[7vw] px-5">
							Road
						</span>
						<span className="ml-3">to Freedom.</span>
					</h1>

					{/* Bottom content */}
					<div className="mt-14 grid gap-8 border-t border-[#20232B]/15 pt-6 md:grid-cols-[1fr_auto] md:items-end">
						<p className="max-w-2xl text-sm leading-7 text-[#20232B]/65 md:text-base">
							Nearly two hundred years of history shaped the destiny of a
							nation. Follow the events, movements, and remarkable individuals
							whose courage led India to independence.
						</p>
					</div>
				</div>

				{/* Decorative side label */}
				<div className="absolute bottom-10 left-6 hidden md:block">
					<p className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#20232B]/30 [writing-mode:vertical-rl]">
						A history of resistance · movement · freedom
					</p>
				</div>
			</section>
			<div
				ref={containerRef}
				className="relative mx-auto w-full max-w-md px-6"
				style={{
					aspectRatio: `${VIEWBOX_W} / ${VIEWBOX_H}`,
				}}
			>
				<svg
					className="absolute inset-0 z-0 h-full w-full text-[#20232B]"
					viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
					preserveAspectRatio="none"
					fill="none"
					role="img"
					aria-label="Timeline path from 1757 to 1947"
				>
					<title>Timeline path from 1757 to 1947</title>

					<defs>
						<mask
							id="reveal-mask"
							maskUnits="userSpaceOnUse"
							x="0"
							y="0"
							width={VIEWBOX_W}
							height={VIEWBOX_H}
						>
							<path
								ref={maskPathRef}
								d={PATH_D}
								stroke="white"
								strokeWidth={STROKE_WIDTH + 4}
								strokeLinecap="round"
								strokeLinejoin="round"
								fill="none"
							/>
						</mask>
					</defs>
					<path
						ref={pathRef}
						d={PATH_D}
						stroke="currentColor"
						strokeWidth={STROKE_WIDTH}
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeDasharray={DASH}
						mask="url(#reveal-mask)"
					/>
				</svg>
				{stops.map((stop, i) => {
					const p = points[i];
					return (
						<div
							key={stop.title}
							ref={(el) => {
								markerRefs.current[i] = el;
							}}
							className="absolute z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7A2E2E]"
							style={{
								left: p ? `${p.xPct}%` : "50%",
								top: p ? `${p.yPct}%` : "50%",
							}}
						>
							<div
								ref={(el) => {
									itemRefs.current[i] = el;
								}}
								className={`group absolute z-20 bg-[#EDE7D8] p-2 ${
									p?.side === "right" ? "text-left" : "text-right"
								}`}
								style={{
									width: CARD_WIDTH,
									top: getCardTopOffset(i),
									left: p?.side === "right" ? CARD_GAP : undefined,
									right: p?.side === "left" ? CARD_GAP : undefined,
								}}
							>
								<div className="pointer-events-none absolute inset-x-0 bottom-full mb-3 translate-y-2 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
									<img
										src={stop.image}
										alt={stop.title}
										className="aspect-[4/3] w-full rounded-sm object-cover"
									/>
								</div>

								<p className="mb-1.5 font-mono text-xs tracking-wide text-[#7A2E2E]">
									{String(i + 1).padStart(2, "0")} — {stop.date}
								</p>

								<h3 className="font-serif text-xl leading-[1.3] text-[#20232B]">
									{stop.title}
								</h3>

								<p className="mt-1 text-sm text-[#20232B]/60">{stop.place}</p>
							</div>
						</div>
					);
				})}
			</div>
			<section className="relative mx-auto mt-28 max-w-5xl px-6 pb-12 pt-20 md:mt-36 md:px-12">
				<div className="mb-16 flex items-center gap-4">
					<span className="h-px flex-1 bg-[#20232B]/15" />
				</div>
				<div className="grid gap-12 md:grid-cols-[180px_1fr]">
					<div className="flex items-start justify-between md:flex-col">
						<div>
							<p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7A2E2E]">
								1947
							</p>

							<p className="mt-2 text-xs leading-5 text-[#20232B]/45">
								A new chapter
								<br />
								begins.
							</p>
						</div>
					</div>
					<div className="relative">
						<span
							aria-hidden
							className="absolute -left-5 -top-10 font-serif text-8xl leading-none text-[#7A2E2E]/15 md:-left-8"
						>
							“
						</span>

						<blockquote className="relative max-w-4xl font-serif text-3xl leading-[1.2] tracking-tight text-[#20232B] md:text-5xl lg:text-6xl">
							At the stroke of the midnight hour, when the world sleeps, India
							will awake to life and freedom.
						</blockquote>

						<div className="mt-10 flex items-center gap-4">
							<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7A2E2E]">
								Jawaharlal Nehru
							</p>

							<span className="text-[#20232B]/30">·</span>

							<p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#20232B]/40">
								Tryst with Destiny
							</p>
						</div>
					</div>
				</div>
			</section>
			<div aria-hidden className="h-[15vh]" />
		</div>
	);
}
