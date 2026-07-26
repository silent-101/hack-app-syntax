import { createFileRoute } from '@tanstack/react-router'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { useRef } from 'react'

export const Route = createFileRoute('/')({ component: Home })
gsap.registerPlugin(useGSAP)

const imgs = [
  "https://images.unsplash.com/photo-1784088913006-3683757abeca?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1781546185188-2622824506a1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1784034292628-8cf609c03465?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1781088105241-576cc09d1de4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1784198030410-fddd2043a80b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1764377845793-77e68f882f3f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

const loaderTxt = "Bharat"
function Home() {
  const boxRef = useRef<HTMLDivElement>(null)
  const loaderTxtRef = useRef<HTMLDivElement>(null)
  const exitLoaderRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.stack-card')
    const initImgRotate = [-10.5, 12.5, -15.5, 13.5, -7.5, 8.5]
    const spans = loaderTxtRef.current?.querySelectorAll('.char') || []

    const lodingPercent = loaderTxtRef.current?.querySelectorAll('.loading-percent span') || []

    cards.forEach((card, index) => {
      gsap.set(card, {
        rotation: 0,
        scale: 0,
      })
    })

    spans.forEach((span) => {
      gsap.set(span, {
        y: '100%',
      })
    })
    lodingPercent.forEach((span) => {
      gsap.set(span, {
        y: '100%',
      })
    })

    const tl = gsap.timeline({ defaults: { delay: 0.5 } })
    cards.forEach((card, index) => {
      tl.to(card, {
        rotation: initImgRotate[index],
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2,
      }, index * 0.3)
    })

    tl.to(spans, {
      delay: 0.8,
      y: 0,
      duration: 1,
      ease: 'power2.out',
      stagger: { each: 0.09, from: 'random' },
    }, 0)

    // Animate loading percentage from 0 to 100
    const counter = { value: 0 }
    const percentDisplay = document.querySelector('.loading-number')
    tl.to(counter, {
      delay: 0.6,
      value: 100,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        if (percentDisplay) {
          percentDisplay.textContent = Math.round(counter.value).toString()
        }
      },
    }, 0)

    tl.to(lodingPercent, {
      y: 0,
      duration: 1,
      ease: 'power2.out',
      stagger: { each: 0.05, from: 'random' },
    }, 0)



    cards.reverse().forEach((card, index) => {
      tl.to(card, {
        delay: 3.5,
        rotation: 0,
        scale: 0,
        duration: 1,
        ease: 'power2.in',
        stagger: 0.2,
      }, index * 0.2)
    })

    tl.to(spans, {
      y: "100%",
      duration: 1,
      ease: 'power2.out',
      stagger: { each: 0.07, from: 'random' },
    }, "=-1.5")
     tl.to(lodingPercent, {
      y: "-100%",
      duration: 0.7,
      ease: 'back.in',
      stagger: { each: 0.05, from: 'random' },
    }, "=-1.5")

    tl.to(exitLoaderRef.current, {
      y: "0%",
      duration: 1,
      ease: 'power2.inOut',
    }, "=-1.3")

  }, { scope: boxRef })

  return (
    <div className="w-full relative min-h-screen flex items-center justify-center bg-black" ref={boxRef}>
        {imgs.map((item, index) => (
          <div
            key={item}
            className="absolute inset-0 w-[250px] h-[300px] transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 pointer-events-none"
          >
            <div className="stack-card h-full w-full overflow-hidden">
              <img
                src={item}
                alt={`Card ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
        <h1
          ref={loaderTxtRef}
          className="text-[25vh] bg-transparent tracking-[-0.5rem] font-bold z-10 metrophobic-regular flex items-center justify-center absolute inset-0"
        >
          {/* <div className="flex items-center justify-center">
            <p className="loading-percent overflow-hidden absolute top-[35%] text-sm right-[1%] flex items-center justify-center">
              <span className="loading-number inline-block translate-y-full">0</span>
            </p>
          </div> */}
          {loaderTxt.split("").map((letter, index) => (
            <p key={index} className="overflow-hidden bg-transparent">
              <span className="char inline-block translate-y-full text-white mix-blend-difference bg-transparent">
                {letter}
              </span>
            </p>
          ))}
        </h1>
        <div ref={exitLoaderRef} className="absolute inset-0 w-full h-full bg-red-900 z-50 transform -translate-y-full">
        </div>
    </div>
  )
}
