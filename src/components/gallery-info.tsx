import type { GalleryProps } from "./gallery";
import maskUrl from "../assets/mask.png";




export function GalleryInfoUi({data}: {data: GalleryProps}) {
    return (
          <div className="relative max-h-svh overflow-hidden bg-black">
                <div
                    role="img"
                    aria-label={`Image-${data.title}`}
                    className="h-[400px] w-[350px] bg-center bg-no-repeat bg-cover"
                    style={{
                        backgroundImage: `url(${data.url})`,
                        WebkitMaskImage: `url(${maskUrl})`,
                        maskImage: `url(${maskUrl})`,
                        WebkitMaskSize: "120% 120%",
                        maskSize: "100% 100%",
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                    }}
                />
            </div>
    )
}