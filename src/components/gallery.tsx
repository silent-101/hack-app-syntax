import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { GalleryInfoUi } from "./gallery-info";



gsap.registerPlugin(useGSAP, ScrollToPlugin);


export type GalleryProps = {
    dec: string,
    url: string,
    title: string
}



const imgs = [
    {
        dec: "New Delhi",
        title: "India Gate",
        url: "https://images.unsplash.com/photo-1637823370891-7dc8a00f64f9?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        dec: "New Delhi",
        title: "Lotus Temple",
        url: "https://images.unsplash.com/photo-1781546185188-2622824506a1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        dec: "New Delhi",
        title: "Qutub Minar",
        url: "https://images.unsplash.com/photo-1784034292628-8cf609c03465?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx"
    },
    {
        dec: "New Delhi",
        title: "Red Fort",
        url: "https://images.unsplash.com/photo-1781088105241-576cc09d1de4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        dec: "New Delhi",
        title: "Humayun's Tomb",
        url: "https://images.unsplash.com/photo-1784198030410-fddd2043a80b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
] as GalleryProps[]




export function GalleryUI() {
    const [imgIndex, setImgIndex] = useState(0)
    const thumbnailsListRef = useRef<HTMLDivElement>(null)
    const thumbnailRef = useRef<HTMLDivElement[]>([])
    const imgRef = useRef<HTMLImageElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const keyUpAndDownHandler = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp") {
                setImgIndex((prev) => {
                    const next = Math.max(prev - 1, 0);
                    scrollToThumbnail(next);
                    return next;
                })

            } else if (e.key === "ArrowDown") {
                setImgIndex((prev) => {
                    const next = (prev + 1) % imgs.length;
                    scrollToThumbnail(next);
                    return next;
                });
            }
        }
        window.addEventListener("keydown", keyUpAndDownHandler)
        return () => {
            window.removeEventListener("keydown", keyUpAndDownHandler)
        }
    }, [])

    const scrollToThumbnail = (index: number) => {
        const thu = thumbnailRef.current[index]
        if (!thu || !thumbnailsListRef.current) return
        const offsetY = (thumbnailsListRef.current.clientHeight - thu.clientHeight) / 2
        gsap.to(thumbnailsListRef.current, {
            scrollTo: { y: thu, offsetY },
            duration: 0.7,
            ease: "power1.out",
        })
        gsap.fromTo(imgRef.current, {
            scale: 0.95, opacity: 0.5
        }, {
            scale: 1, opacity: 1, duration: 0.7, ease: "power1.out"
        })
        gsap.fromTo(titleRef.current, {
            y: 20, opacity: 0
        }, {
            y: 0, opacity: 1, duration: 0.7, ease: "power1.out"
        })
    }

    return (
        <div className="grid grid-cols-[1fr_300px]">
          <GalleryInfoUi data={imgs[imgIndex]}/>
            <div
                ref={thumbnailsListRef}
                className="overflow-y-auto max-h-svh p-5 space-y-5 bg-black"
            >
                {imgs.map((img, index) => (
                    <div key={index}
                        ref={(el) => {
                            thumbnailRef.current[index] = el as HTMLDivElement
                        }}
                        className={`img-container w-full h-37.5 cursor-pointer transform transition-transform duration-300 ease-out ${imgIndex === index ? "scale-105 border-2 border-slate-50" : "scale-95"}`}
                    >
                        <img
                            onClick={() => setImgIndex(index)}
                            src={img.url} alt={`Image ${index + 1}`} className="w-full block h-full object-cover" />
                    </div>
                ))}
            </div>
        </div>
    )
}