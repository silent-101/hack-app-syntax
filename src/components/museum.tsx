import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Compass, X, MapPin } from "lucide-react";
import { Link } from '@tanstack/react-router';
import indiaPicture from "../assets/india_picture.png";
import "./Home.css";

export type GalleryProps = {
  dec: string;
  url: string;
  title: string;
  facts?: { label: string; value: string }[];
  region?: string;
};

const museumData: GalleryProps[] = [
  {
    dec: "Where earth reaches for the heavens, the mighty Himalayas rise as ancient sentinels of the world. Their snow-crowned peaks cradle sacred rivers, shelter spiritual seekers, and whisper secrets to civilizations older than memory — a timeless realm where the mortal glimpses the divine.",
    title: "The Himalayan Mountains",
    region: "Northern India",
    url: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    facts: [
      { label: "Highest Peak", value: "Mount Everest at 8,849 metres" },
      { label: "Length", value: "Stretches 2,400 km across five nations" },
      { label: "Sacred Source", value: "Birthplace of the Ganges, Indus & Brahmaputra" },
    ],
  },
  {
    dec: "Golden dunes ripple beneath an endless sky in the Thar — a sun-scorched kingdom of resilience where camel caravans still trace forgotten trade routes. Vibrant turbans blaze against ochre sands, folk songs drift on desert winds, and every sunset paints the horizon in molten fire.",
    title: "Thar Desert",
    region: "Rajasthan",
    url: "https://images.unsplash.com/photo-1463595373836-6e0b0a8ee322?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    facts: [
      { label: "Area", value: "Over 200,000 square kilometres of dunes" },
      { label: "Living Fortress", value: "Jaisalmer, the amber-walled desert city" },
      { label: "Culture", value: "Home to Manganiar and Kalbeliya folk traditions" },
    ],
  },
  {
    dec: "Where three seas kiss India's shores, a 7,500-kilometre symphony of gold-dust beaches, swaying palms, and turquoise tides unfolds. From Goa's sunlit coves to Kerala's serene backwaters, this tropical embrace hums with the eternal rhythm of tide, trade, and tradition.",
    title: "Coastal Paradise of India",
    region: "Peninsular Coast",
    url: "https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2019/03/best-coastlines-world.jpg?fit=1300%2C731&ssl=1",
    facts: [
      { label: "Coastline", value: "7,517 km of shore across three seas" },
      { label: "Jewels", value: "Goa, Kerala, Andamans & Lakshadweep" },
      { label: "Heritage", value: "Ancient spice ports that shaped world trade" },
    ],
  },
  {
    dec: "Life flows through India on sacred currents. From the celestial Ganges to the untamed Brahmaputra, these rivers are more than water — they are goddesses, mothers, and storytellers, carrying prayers, empires, and monsoon dreams across the soul of a subcontinent.",
    title: "Rivers of India",
    region: "Across the Subcontinent",
    url: "https://static.toiimg.com/thumb/116331344/River-destinations-in-India.jpg?width=1200&height=900",
    facts: [
      { label: "Sacred Seven", value: "Ganga, Yamuna, Godavari, Saraswati, Narmada, Sindhu, Kaveri" },
      { label: "Longest", value: "The Ganges flows 2,525 km to the Bay of Bengal" },
      { label: "Lifeblood", value: "Sustains over 500 million lives daily" },
    ],
  },
  {
    dec: "Two emerald spines run the length of a nation. The Western and Eastern Ghats rise as ancient guardians, cloaked in mist and myth — older than the Himalayas themselves. Within their forests roam tigers and elephants, orchids bloom in secret, and countless untold stories still linger.",
    title: "Western and Eastern Ghats",
    region: "Peninsular India",
    url: "https://blog-content.ixigo.com/wp-content/uploads/2016/06/shutterstock_274056443.jpg",
    facts: [
      { label: "Age", value: "Over 150 million years old — older than the Himalayas" },
      { label: "Recognition", value: "Western Ghats — UNESCO World Heritage Site" },
      { label: "Wildlife", value: "Sanctuary to tigers, elephants & lion-tailed macaques" },
    ],
  },
];

type GalleryUiProps = {
  data: GalleryProps[];
};

export function GalleryUi({ data }: GalleryUiProps) {
  const [current, setCurrent] = useState(0);
  const [exploreOpen, setExploreOpen] = useState(false);

  const next = () => {
    setCurrent((prev) => (prev + 1) % data.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + data.length) % data.length);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExploreOpen(false);
        return;
      }

      if (exploreOpen) return;

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
  }, [data.length, exploreOpen]);

  useEffect(() => {
    if (exploreOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [exploreOpen]);

  if (!data.length) return null;

  const active = data[current];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="relative overflow-hidden rounded-3xl">
        <img
          src={active.url}
          alt={active.title}
          className="h-[600px] w-full rounded-3xl object-cover transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

        <div className="absolute left-6 top-6 flex items-center gap-3">
          <span className="rounded-full bg-amber-400/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-black shadow-md">
            Exhibit {String(current + 1).padStart(2, "0")} / {String(data.length).padStart(2, "0")}
          </span>
        </div>

        <div className="absolute right-6 top-6">
          <button
            onClick={() => setExploreOpen(true)}
            className="group flex items-center gap-2 rounded-full border border-amber-300/70 bg-white/10 px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-lg backdrop-blur-md transition hover:border-amber-300 hover:bg-amber-400/25 hover:text-amber-100"
          >
            <Compass
              size={16}
              className="transition-transform duration-500 group-hover:rotate-[135deg]"
            />
            Explore
          </button>
        </div>

        <div className="absolute bottom-10 left-10 right-10 max-w-3xl text-white">
          <h1
            className="mb-3 text-5xl font-bold leading-tight drop-shadow-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {active.title}
          </h1>
          <div className="mb-4 h-[3px] w-16 rounded-full bg-amber-400" />
          <p className="text-lg leading-relaxed text-white/90">{active.dec}</p>
        </div>

        <button
          onClick={prev}
          className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-3 backdrop-blur transition hover:bg-black/50"
        >
          <ChevronLeft size={30} className="text-white" />
        </button>

        <button
          onClick={next}
          className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-3 backdrop-blur transition hover:bg-black/50"
        >
          <ChevronRight size={30} className="text-white" />
        </button>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        {data.map((img, index) => (
          <button
            key={img.title}
            onClick={() => setCurrent(index)}
            className="overflow-hidden rounded-xl"
          >
            <img
              src={img.url}
              alt={img.title}
              className={`h-24 w-40 object-cover transition-all duration-300 ${
                current === index
                  ? "scale-110 border-4 border-amber-400"
                  : "opacity-60 hover:opacity-100"
              }`}
            />
          </button>
        ))}
      </div>

      {exploreOpen && (
        <div
          onClick={() => setExploreOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-[#1a1410] shadow-2xl"
          >
            <button
              onClick={() => setExploreOpen(false)}
              className="absolute right-5 top-5 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur transition hover:bg-white/25"
            >
              <X size={22} />
            </button>

            <div className="max-h-[92vh] overflow-y-auto">
              <div className="relative h-72 w-full overflow-hidden sm:h-96">
                <img
                  src={active.url}
                  alt={active.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1410] via-transparent to-transparent" />
                <div className="absolute bottom-6 left-8 right-8 text-white">
                  <span className="mb-3 inline-block rounded-full bg-amber-400/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-black">
                    Exhibit {String(current + 1).padStart(2, "0")}
                  </span>
                  <h2
                    className="text-4xl font-bold leading-tight sm:text-5xl"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {active.title}
                  </h2>
                  {active.region && (
                    <div className="mt-2 flex items-center gap-2 text-white/80">
                      <MapPin size={14} className="text-amber-300" />
                      <span className="text-sm uppercase tracking-[0.2em]">
                        {active.region}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-8 pb-10 pt-6 text-white">
                <div className="mb-6 h-[2px] w-16 rounded-full bg-amber-400" />
                <p className="mb-8 text-lg leading-relaxed text-white/85">
                  {active.dec}
                </p>

                {active.facts && active.facts.length > 0 && (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {active.facts.map((fact) => (
                      <div
                        key={fact.label}
                        className="rounded-2xl border border-amber-400/20 bg-white/[0.04] p-5 transition hover:border-amber-400/50 hover:bg-white/[0.07]"
                      >
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
                          {fact.label}
                        </h4>
                        <p className="text-sm leading-relaxed text-white/90">
                          {fact.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                    Press ESC or click outside to close
                  </p>
                  <button
                    onClick={() => setExploreOpen(false)}
                    className="rounded-full bg-amber-400 px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:bg-amber-300"
                  >
                    Return to Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const Museum: React.FC = () => {
  return (
    <>
      <main className="hero" id="home">
        <img
          className="hero__image"
          src={indiaPicture}
          alt="A scenic landscape in India"
        />

        <div className="hero__shade" />

        <header className="site-header">
          <a className="brand" href="#home">
            Dekho Bharat
          </a>

          <nav className="nav">
            <Link to="/museum">Museum</Link>
            <Link to="/gallery">Gallery</Link>
          </nav>
        </header>

        <section className="hero__content">
          <p className="eyebrow">
            A journey through culture, nature &amp; history
          </p>

          <h1>
            THE
            <br />
            MUSEUM
          </h1>

          <p className="intro">
            Welcome to the soul of India, where centuries of grandeur, timeless traditions, and architectural marvels come alive. Journey through a magnificent legacy woven with royal splendor, artistic brilliance, and the enduring spirit of one of the world's oldest civilizations.
          </p>
        </section>
      </main>

      <section className="museum-section" style={{ padding: "4rem 1.5rem", background: "#F8F4EC" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "left", marginBottom: "2.5rem" }}>
            <h3 style={{ letterSpacing: "0.2rem", textTransform: "uppercase", color: "#9f7a3a", marginBottom: "0.5rem" }}>
              Treasures of the Ages
            </h3>
            <h2 style={{ fontSize: "2.5rem", margin: 0, color: "#1d1d1d" }}>
              A living archive of India
            </h2>
          </div>

          <GalleryUi data={museumData} />
        </div>
      </section>

      <section style={{ padding: "4rem 1.5rem", background: "#f2ead9" }}>
        <h2 style={{ textAlign: "left", marginBottom: "2.5rem", fontFamily: "Arial, sans-serif" }}>The History of India</h2>
      </section>
    </>
  );
};

export default Museum;
