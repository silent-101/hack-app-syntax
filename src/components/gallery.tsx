import { galleryData } from "#/lib/gallery-data.ts";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);


export function Gallery() {
  const imgsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const activeStory = galleryData[activeIndex];

  useGSAP(() => {
    const imgs = imgsRef.current?.querySelectorAll(".img-box");
    if (!imgs) return;

    let lastIndex = -1;
    const updateActive = () => {
      const viewportCenter = window.innerHeight / 2;
      let newIndex = 0;
      let minDistance = Infinity;

      imgs.forEach((img, index) => {
        const rect = img.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          newIndex = index;
        }
      });

      if (newIndex !== lastIndex) {
        lastIndex = newIndex;
        setActiveIndex(newIndex);
                infoAnimation();

        gsap.to(imgs, {
          opacity: 0.5,
          scale: 0.95,
          duration: 0.7,
          overwrite: "auto",
        });
        gsap.to(imgs[newIndex], {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          overwrite: "auto",
        });
      }
    };

    updateActive();

    const st = ScrollTrigger.create({
      trigger: imgsRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: updateActive,
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      st.kill();
    };
  });

  const infoAnimation = () => {
    // Animate the info panel in/out
    gsap.fromTo(
      ".info-panel",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  };

  return (
    <div className="w-full min-h-screen bg-black font-satoshi relative"
    >
      <nav>
        <div className="fixed top-0 left-0 w-fit h-16 bg-black z-50 flex items-center px-10">
          <div className="text-white text-2xl font-bold">Discover</div>
        </div>
      </nav>
      <div className="flex items-start w-full justify-center gap-14">
        {/* Left panel — shows the active story's data */}
        <div className="info-panel sticky top-0 flex flex-col items-start justify-center h-screen w-[20%]">
            <>
              <div className="text-2xl font-bold text-white">
                {activeStory.title}
              </div>
              <div className="mt-1 text-xs text-gray-400">
                {activeStory.location}
              </div>
              <div className="mt-4 text-base text-white/80">
                {activeStory.dec}
              </div>
            </>
        </div>

        <div className="w-[40%] space-y-5 py-[12%]" ref={imgsRef}>
          {galleryData.map((story, index) => (
            <div
              key={index}
              className="img-box opacity-50"
            >
              <img
                src={story.url}
                alt={story.title}
                className="w-full h-full object-cover aspect-video"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}