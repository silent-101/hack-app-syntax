import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";


const socialLinks = [
	{
		label: "Instagram",
		href: "https://www.instagram.com/",
		path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z",
	},
	{
		label: "Twitter",
		href: "https://x.com/",
		path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z",
	},
];


export function HomeUI() {
	return (
		<main
			id="home"
			className="
				relative
				min-h-screen
				overflow-hidden
				bg-black
				px-[clamp(24px,5vw,72px)]
				py-7
				text-white
			"
		>

			<img
				src="https://images.unsplash.com/photo-1607836046730-3317bd58a31b?q=80&w=1170&auto=format&fit=crop"
				alt="Indian heritage landscape"
				className="
					absolute
					inset-0
					-z-20
					h-full
					w-full
					object-cover
				"
			/>


			<div
				className="
					absolute
					inset-0
					-z-10
					bg-[linear-gradient(90deg,rgba(0,0,0,.8),rgba(0,0,0,.25)),linear-gradient(0deg,rgba(0,0,0,.85),transparent_60%)]
				"
			/>


			<div
				className="
					absolute
					inset-0
					-z-10
					bg-[radial-gradient(circle,transparent_20%,rgba(0,0,0,.6))]
				"
			/>



			<header
				className="
					flex
					items-center
					justify-between
				"
			>

				<div>
					<p
						className="
							font-mono
							text-[10px]
							tracking-[0.4em]
							text-white/50
						"
					>
						NATIONAL HERITAGE ARCHIVE
					</p>

					<h2
						className="
							font-serif
							text-3xl
							italic
						"
					>
						Dekho Bharat
					</h2>
				</div>



				<nav
					className="
						hidden
						md:flex
						gap-10
						font-mono
						text-xs
						uppercase
						tracking-[0.3em]
					"
				>

					<Link
						to="/"
						className="hover:text-white/50 transition"
					>
						Museum
					</Link>


					<Link
						to="/gallery"
						className="hover:text-white/50 transition"
					>
						Gallery
					</Link>

				</nav>

			</header>




			<section
				className="
					relative
					z-10
					mx-auto
					mt-[150px]
					max-w-5xl
					text-center
				"
			>

				<p
					className="
						flex
						items-center
						justify-center
						gap-4
						font-mono
						text-xs
						tracking-[0.35em]
						text-white/60
					"
				>

					<span className="h-px w-10 bg-white/30" />

					DIGITAL MUSEUM EXPERIENCE

					<span className="h-px w-10 bg-white/30" />

				</p>



				<h1
					className="
						mt-8
						font-serif
						text-[clamp(4rem,10vw,8rem)]
						leading-[0.85]
						tracking-tight
					"
				>

					Stories

					<br />

					<span className="italic text-white/80">
						Of India
					</span>

				</h1>



				<p
					className="
						mx-auto
						mt-8
						max-w-xl
						text-lg
						leading-relaxed
						text-white/70
					"
				>
					Explore centuries of kingdoms, cultures,
					and civilizations through an immersive
					digital archive.
				</p>



				<Link
					to="/"
					className="
						group
						mt-10
						inline-flex
						items-center
						gap-4
						rounded-full
						bg-[#EDE7D8]
						px-6
						py-2
						font-medium
						text-[#20232B]
						transition
						hover:scale-105
					"
				>

					Enter Museum


					<span
						className="
							grid
							h-10
							w-10
							place-items-center
							rounded-full
							bg-black
							text-white
							transition
							group-hover:rotate-45
						"
					>

						<ArrowUpRight size={18} />

					</span>

				</Link>


			</section>





			<div
				className="
					fixed
					right-8
					top-1/2
					hidden
					-translate-y-1/2
					flex-col
					gap-3
					md:flex
				"
			>

				{
					socialLinks.map((item) => (
						<a
							key={item.label}
							href={item.href}
							target="_blank"
							className="
								grid
								h-10
								w-10
								place-items-center
								rounded-full
								border
								border-white/30
								bg-black/20
								backdrop-blur
								transition
								hover:bg-white
								hover:text-black
							"
						>

							<svg
								viewBox="0 0 24 24"
								className="h-4 w-4"
								fill="currentColor"
							>
								<path d={item.path} />
							</svg>

						</a>
					))
				}

			</div>




			<footer
				className="
					absolute
					bottom-8
					left-8
					font-mono
					text-xs
					tracking-[0.3em]
					text-white/50
				"
			>

				1600 — PRESENT
				<span className="mx-4">
					•
				</span>
				INDIAN HISTORY ARCHIVE

			</footer>


		</main>
	);
}