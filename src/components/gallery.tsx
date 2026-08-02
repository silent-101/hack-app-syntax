import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useCallback, useEffect, useRef, useState } from "react";
import { type MuseumSection, sections } from "#/lib/gallery-data.ts";
import { ExploreModal } from "./explore-m";
import { SectionSlide } from "./selection";

gsap.registerPlugin(useGSAP, ScrollToPlugin);

export function Gallery() {
	const [imgIndex, setImgIndex] = useState(0);
	const [selectedSection, setSelectedSection] = useState<MuseumSection | null>(
		null,
	);
	const thumbnailsListRef = useRef<HTMLDivElement>(null);
	const thumbnailRef = useRef<HTMLButtonElement[]>([]);
	const imgRef = useRef<HTMLImageElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);

	const scrollToThumbnail = useCallback((index: number) => {
		const thu = thumbnailRef.current[index];
		if (!thu || !thumbnailsListRef.current) return;
		const offsetY =
			(thumbnailsListRef.current.clientHeight - thu.clientHeight) / 2;
		gsap.to(thumbnailsListRef.current, {
			scrollTo: { y: thu, offsetY },
			duration: 0.7,
			ease: "power1.out",
		});
		gsap.fromTo(
			imgRef.current,
			{
				scale: 0.95,
				opacity: 0.5,
			},
			{
				scale: 1,
				opacity: 1,
				duration: 0.7,
				ease: "power1.out",
			},
		);
		gsap.fromTo(
			titleRef.current,
			{
				y: 20,
				opacity: 0,
			},
			{
				y: 0,
				opacity: 1,
				duration: 0.7,
				ease: "power1.out",
			},
		);
	}, []);

	useEffect(() => {
		const keyUpAndDownHandler = (e: KeyboardEvent) => {
			if (e.key === "ArrowUp") {
				setImgIndex((prev) => {
					const next = Math.max(prev - 1, 0);
					scrollToThumbnail(next);
					return next;
				});
			} else if (e.key === "ArrowDown") {
				setImgIndex((prev) => {
					const next = (prev + 1) % sections.length;
					scrollToThumbnail(next);
					return next;
				});
			}
		};
		window.addEventListener("keydown", keyUpAndDownHandler);
		return () => {
			window.removeEventListener("keydown", keyUpAndDownHandler);
		};
	}, [scrollToThumbnail]);

	const handleExplore = (section: MuseumSection) => {
		setSelectedSection(section);
	};

	return (
		<div className="grid grid-cols-[1fr_300px]">
			<div className="relative max-h-svh overflow-hidden bg-black">
				<SectionSlide
					section={sections[imgIndex]}
					active={true}
					onExplore={handleExplore}
				/>
			</div>
			<div
				ref={thumbnailsListRef}
				className="overflow-y-auto max-h-svh p-5 space-y-5 bg-black"
			>
				{sections.map((img, index) => (
					<button
						type="button"
						key={img.id}
						ref={(el) => {
							thumbnailRef.current[index] = el as HTMLButtonElement;
						}}
						onClick={() => setImgIndex(index)}
						aria-label={`View ${img.title}`}
						className={`img-container w-full h-37.5 cursor-pointer transform transition-transform duration-300 ease-out ${imgIndex === index ? "scale-105 border-2 border-slate-50" : "scale-95"}`}
					>
						<img
							src={img.imageUrl}
							alt={img.title}
							className="w-full block h-full object-cover"
						/>
					</button>
				))}
			</div>
			{selectedSection && (
				<ExploreModal
					section={selectedSection}
					onClose={() => setSelectedSection(null)}
				/>
			)}
		</div>
	);
}
