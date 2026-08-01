import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HistoryCard } from "./Historycard";
import { historyData } from "../Data/history";

export function HistoryTimeline() {
  const [current, setCurrent] = useState(2);

  const next = () => {
    setCurrent((prev) => (prev + 1) % historyData.length);
  };

  const prev = () => {
    setCurrent(
      (prev) => (prev - 1 + historyData.length) % historyData.length
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        next();
      }

      if (event.key === "ArrowLeft") {
        prev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const left = (current - 1 + historyData.length) % historyData.length;
  const right = (current + 1) % historyData.length;

  return (
    <section className="relative overflow-hidden bg-[#0f0f10] py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="tracking-[0.5em] text-amber-400 uppercase">
            Museum Collection
          </p>

          <h1 className="mt-4 text-6xl font-bold text-white">
            THE HISTORY OF INDIA
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-neutral-300">
            Journey through thousands of years of civilization, from the world’s
            earliest urban settlements to the rise of powerful empires and modern
            India.
          </p>
        </div>

        <div className="relative mt-20 flex justify-center">
          <svg
            width="100%"
            height="170"
            viewBox="0 0 1200 170"
            className="absolute"
          >
            <path
              d="M80 120 C250 20, 450 20, 600 90 C750 160, 950 160, 1120 60"
              stroke="#d4af37"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative flex w-full justify-between px-20 pt-6">
            {historyData.map((item, index) => (
              <button
                key={item.title}
                onClick={() => setCurrent(index)}
                className="flex flex-col items-center"
              >
                <div
                  className={`rounded-full border-4 transition-all duration-500 ${
                    current === index
                      ? "h-7 w-7 border-amber-400 bg-amber-400 shadow-[0_0_25px_rgba(212,175,55,0.9)]"
                      : "h-5 w-5 border-neutral-500 bg-[#0f0f10]"
                  }`}
                />

                <span
                  className={`mt-5 text-sm ${
                    current === index ? "text-amber-400" : "text-neutral-500"
                  }`}
                >
                  {item.year}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative mt-24 flex items-center justify-center gap-24">
          <div
            onClick={prev}
            className="cursor-pointer transition duration-500 hover:scale-105"
          >
            <HistoryCard
              image={historyData[left].image}
              title={historyData[left].title}
              subtitle={historyData[left].year}
            />
          </div>

          <div className="z-20 scale-110 transition-all duration-500">
            <HistoryCard
              image={historyData[current].image}
              title={historyData[current].title}
              subtitle={historyData[current].year}
              active
            />
          </div>

          <div
            onClick={next}
            className="cursor-pointer transition duration-500 hover:scale-105"
          >
            <HistoryCard
              image={historyData[right].image}
              title={historyData[right].title}
              subtitle={historyData[right].year}
            />
          </div>
        </div>

        <div className="mx-auto mt-20 max-w-5xl rounded-[30px] border border-white/10 bg-white/5 p-12 backdrop-blur-xl shadow-[0_15px_60px_rgba(0,0,0,0.35)]">
          <h2 className="text-center text-4xl font-bold text-amber-400">
            {historyData[current].title}
          </h2>

          <p className="mt-8 text-center text-lg leading-9 text-neutral-300">
            {historyData[current].description}
          </p>
        </div>

        <div className="mt-14 flex justify-center gap-6">
          <button
            onClick={prev}
            className="rounded-full bg-white/10 p-4 transition hover:bg-amber-500"
          >
            <ChevronLeft className="text-white" />
          </button>

          <button
            onClick={next}
            className="rounded-full bg-white/10 p-4 transition hover:bg-amber-500"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default function Museum2() {
  return <HistoryTimeline />;
}