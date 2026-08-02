import { stops } from "#/lib/timeline-data.ts";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, useGSAP);

const VIEWBOX_W = 491;
const VIEWBOX_H = 1949;
const STROKE_WIDTH = 1;
const DASH = "13 13";
const PATH_D = "M418 0 C395 4 362 14 332 30 C295 50 258 75 224 108 C190 140 171 178 164 220 C156 274 164 326 178 372 C194 425 238 454 295 480 C347 504 398 528 432 560 C462 590 475 640 474 710 C473 785 445 835 398 882 C354 926 295 950 238 976 C185 1000 136 1040 96 1098 C55 1158 22 1222 18 1288 C15 1355 42 1415 72 1470 C102 1525 160 1560 235 1590 C300 1616 355 1632 392 1668 C428 1704 424 1760 392 1812 C354 1872 282 1914 74 1949"

const CARD_WIDTH = 224;
const CARD_GAP = 72;

type MarkerPoint = { xPct: number; yPct: number; side: "left" | "right" };

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
			const side = i === stops.length - 1 ? "left" : i % 2 === 0 ? "right" : "left";
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
					{ opacity: 0.25, filter: "grayscale(1)", y: 12 },
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
		{ dependencies: [points], scope: containerRef },
	);

	return (
		<div className="w-full bg-[#EDE7D8]">
			<div className="min-h-screen flex flex-col items-center justify-center px-6">
				<p className="font-mono text-xs tracking-[0.3em] uppercase text-[#7A2E2E] mb-3">
					1757 — 1947
				</p>
				<h1 className="text-5xl md:text-6xl font-serif text-[#20232B]">
					The Long Road to Freedom
				</h1>
				<p className="mt-6 max-w-3xl text-center text-base leading-relaxed text-[#20232B]/70 md:text-lg">
					Nearly two hundred years of history shaped the destiny of a nation.
					Follow the events, movements, and remarkable individuals whose courage
					led India to independence.
				</p>
			</div>

			<div
				ref={containerRef}
				className="relative w-full max-w-md mx-auto px-6"
				style={{ aspectRatio: `${VIEWBOX_W} / ${VIEWBOX_H}` }}
			>
				<svg
					className="absolute inset-0 w-full h-full text-[#20232B] z-0"
					viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
					preserveAspectRatio="none"
					fill="none"
				>
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
							key={i}
							ref={(el) => {markerRefs.current[i] = el}}
							className="absolute w-3 h-3 rounded-full bg-[#7A2E2E] -translate-x-1/2 -translate-y-1/2 z-10"
							style={{
								left: p ? `${p.xPct}%` : "50%",
								top: p ? `${p.yPct}%` : "50%",
							}}
						>
							<div
								ref={(el) => {itemRefs.current[i] = el}}
								className={`group absolute bg-[#EDE7D8] p-2 z-20 ${
									p?.side === "right" ? "text-left" : "text-right"
								}`}
								style={{
									width: CARD_WIDTH,
									top: getCardTopOffset(i),
									left: p?.side === "right" ? CARD_GAP : undefined,
									right: p?.side === "left" ? CARD_GAP : undefined,
								}}
							>
								<div className="pointer-events-none absolute inset-x-0 bottom-full mb-3 opacity-0 translate-y-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
									<img
										src={stop.image}
										alt={stop.title}
										className="w-full aspect-4/3 object-cover rounded-sm"
									/>
								</div>
								<p className="font-mono text-xs text-[#7A2E2E] mb-1.5 tracking-wide">
									{String(i + 1).padStart(2, "0")} — {stop.date}
								</p>
								<h3 className="text-xl font-serif text-[#20232B] leading-[1.3]">
									{stop.title}
								</h3>
								<p className="mt-1 text-sm text-[#20232B]/60">{stop.place}</p>
							</div>
						</div>
					);
				})}
			</div>

			<section className="mx-auto mt-28 max-w-3xl px-6 pb-28 pt-20 text-center md:mt-36 md:pb-32">
				<blockquote className="text-2xl font-serif leading-relaxed text-[#20232B] md:text-3xl">
					"At the stroke of the midnight hour, when the world sleeps, India will
					awake to life and freedom."
				</blockquote>
				<p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-[#7A2E2E]">
					Jawaharlal Nehru, Tryst with Destiny, 14 August 1947
				</p>
			</section>

			<div aria-hidden className="h-[40vh]" />
		</div>
	);
}