import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { AnimatedTitle } from "./animated-title";

const NAV_LINKS = [
	{ to: "/explore", label: "Museum" },
	{ to: "/gallery", label: "Gallery" },
	{ to: "/chat", label: "Chat" },
] as const;

const INK = "#0B0D12";
const INDIGO = "#16233D";
const SANDSTONE = "#B5462F";
const MARIGOLD = "#E3A542";
const PARCHMENT = "#F3EADD";

export function HomeUI() {
	const rootRef = useRef<HTMLElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const navRef = useRef<HTMLElement>(null);
	const bodyRef = useRef<HTMLParagraphElement>(null);
	const ctaRef = useRef<HTMLAnchorElement>(null);

	return (
		<section
			ref={rootRef}
			id="top"
			className="relative h-screen w-full overflow-hidden"
			style={{ backgroundColor: INK }}
		>
			<img
				ref={imageRef}
				src="https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1800&auto=format&fit=crop"
				alt="Taj Mahal at sunrise"
				className="absolute inset-0 h-full w-full object-cover"
				style={{ transformOrigin: "center center" }}
			/>
			<div
				className="absolute inset-0"
				style={{
					background: `linear-gradient(180deg, ${INDIGO}CC 0%, ${INDIGO}55 40%, ${INK}E6 100%)`,
				}}
			/>

			<header
				ref={navRef}
				className="relative z-40 flex items-start justify-between px-8 pt-9 md:px-14 md:pt-12"
			>
				<div>
					<a
						href="#top"
						className="font-boska text-[1.6rem] font-bold italic tracking-tight"
						style={{ color: PARCHMENT }}
					>
						Dekho Bharat
					</a>
					<p
						className="mt-0.5 text-[0.7rem] uppercase tracking-[0.25em]"
						style={{ color: `${MARIGOLD}CC` }}
					>
						देखो भारत
					</p>
				</div>

				<nav className="flex text-white text-xs">
					{NAV_LINKS.map(({ to, label }) => (
						<Link
							key={to}
							to={to}
							className="group flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.15em] transition-colors duration-200 hover:text-white"
						>
							<span className="hidden h-px w-4 transition-all duration-200 group-hover:w-6 md:block" />
							{label}
						</Link>
					))}
				</nav>
			</header>

			<div className="relative z-20 flex h-full flex-col justify-end px-8 pb-24 md:px-14 md:pb-28">
				<h1
					className="font-boska max-w-3xl text-[13vw] font-bold leading-[0.95] tracking-tight sm:text-[5.5rem] md:text-[6.5rem]"
					style={{ color: PARCHMENT }}
				>
					<span className="block overflow-hidden">
						<span className="inline-block">
							<AnimatedTitle text="Discover the" delay={0.3} />
						</span>
					</span>
					<span className="block overflow-hidden">
						<span className="inline-block">
							<AnimatedTitle text="incredible India" delay={0.6} />
						</span>
					</span>
				</h1>

				<p
					ref={bodyRef}
					className="mt-8 max-w-md text-base leading-relaxed"
					style={{ color: `${PARCHMENT}B3` }}
				>
					Thousands of years of stories, places, people and traditions, told
					through an experience made for the curious.
				</p>

				<Link
					ref={ctaRef}
					to="/explore"
					className="mb-20  mt-5 inline-flex w-fit items-center gap-3 px-7 py-3.5 text-sm font-medium uppercase tracking-[0.1em] transition-colors duration-200 hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
					style={{
						backgroundColor: SANDSTONE,
						color: PARCHMENT,
						border: `1px solid ${MARIGOLD}`,
					}}
				>
					Start exploring
					<ArrowUpRight size={16} />
				</Link>
			</div>
		</section>
	);
}
