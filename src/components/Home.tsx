import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin, Mountain } from "lucide-react";

const socialLinks = [
	{
		label: "Facebook",
		href: "https://www.facebook.com/BeautifulBharata/photos/",
		path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/popular/indian-landscape/",
		path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
	},
	{
		label: "Twitter / X",
		href: "https://x.com/IndiaAesthetica?lang=en",
		path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
	},
];

export function HomeUI() {
	return (
		<main
			className="hero relative min-h-screen overflow-hidden px-[clamp(24px,5vw,72px)] py-[26px] font-satoshi text-white"
			id="home"
		>
			<img
				className="hero__image absolute inset-0 -z-20 h-full w-full object-cover object-center"
				src="https://images.unsplash.com/photo-1607836046730-3317bd58a31b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="A scenic landscape in India"
			/>

			<div className="hero__shade absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(90deg,rgba(4,18,17,0.75),rgba(4,18,17,0.2)_55%,rgba(4,18,17,0.4)),linear-gradient(0deg,rgba(2,12,12,0.65),transparent_55%)]" />

			<header className="site-header relative z-10 flex items-center justify-between gap-6">
				<a
					className="brand font-boska text-[1.7rem] font-bold italic tracking-tight"
					href="#home"
				>
					Dekho Bharat
				</a>

				<nav className="nav absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[38px] text-[0.9rem] font-medium tracking-[0.08em] uppercase">
					<Link
						to="/explore"
						className="transition-colors duration-200 hover:text-white/60"
					>
						Museum
					</Link>
					<Link
						to="/gallery"
						className="transition-colors duration-200 hover:text-white/60"
					>
						Gallery
					</Link>
				</nav>
			</header>

			<section className="hero__content relative z-10 mx-auto mt-[140px] max-w-[900px] text-center">
				<p className="eyebrow inline-flex items-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.3em] text-white/75">
					<span className="h-px w-8 bg-white/40" aria-hidden="true" />A journey
					through culture, nature & history
					<span className="h-px w-8 bg-white/40" aria-hidden="true" />
				</p>

				<h1 className="font-boska my-[18px] text-[clamp(3.2rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.02em]">
					DISCOVER
					<br />
					<span className="italic text-white/95">INCREDIBLE</span> INDIA
				</h1>

				<p className="intro mx-auto mb-[30px] mt-[22px] max-w-[560px] text-[1.05rem] leading-[1.65] text-white/80">
					Explore beautiful landscapes, living history, and a breathtaking 3D
					museum—made for the curious traveller.
				</p>

				<Link
					className="cta group inline-flex items-center gap-4 rounded-full bg-white py-[8px] pl-[24px] pr-[6px] font-semibold text-[#101313] shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
					to="/"
				>
					Start Exploring
					<span
						className="grid h-10 w-10 place-items-center rounded-full bg-black text-white transition-transform duration-200 group-hover:rotate-45"
						aria-hidden="true"
					>
						<ArrowUpRight className="h-5 w-5" />
					</span>
				</Link>
			</section>

			<aside className="social-icons fixed right-8 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-[12px]">
				{socialLinks.map(({ label, href, path }) => (
					<a
						key={label}
						href={href}
						aria-label={label}
						target="_blank"
						rel="noopener noreferrer"
						title={label}
						className="group grid h-11 w-11 place-items-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:border-white hover:bg-white hover:text-[#101313]"
					>
						<svg
							viewBox="0 0 24 24"
							fill="currentColor"
							className="h-[18px] w-[18px]"
							aria-hidden="true"
						>
							<path d={path} />
						</svg>
						<span className="sr-only">{label}</span>
					</a>
				))}
			</aside>

			<footer className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 items-center gap-3 pb-6 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-white/55">
				<Mountain className="h-3.5 w-3.5" aria-hidden="true" />
				Scroll to explore
				<MapPin className="h-3.5 w-3.5" aria-hidden="true" />
			</footer>
		</main>
	);
}
