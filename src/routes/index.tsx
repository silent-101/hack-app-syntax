import { createFileRoute } from '@tanstack/react-router'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { useRef } from 'react'
import { HomeUI } from '#/components/AHome';

export const Route = createFileRoute('/')({ component: Home })
gsap.registerPlugin(useGSAP, CustomEase)

const imgs = [
  "https://images.unsplash.com/photo-1784088913006-3683757abeca?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1781546185188-2622824506a1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1784034292628-8cf609c03465?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1781088105241-576cc09d1de4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1784198030410-fddd2043a80b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1764377845793-77e68f882f3f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
]

const loaderTxt = "Bharat"
const loaderEaseIn = CustomEase.create(
  "loaderEaseIn",
  "M0,0 C0.12,0 0.18,0.02 0.24,0.08 0.36,0.22 0.42,0.68 0.52,0.86 0.62,1 0.76,1 1,1",
)
const loaderPanelEase = CustomEase.create(
  "loaderPanelEase",
  "M0,0 C0.14,0.78 0.2,1 1,1",
)

function Home() {
  const boxRef = useRef<HTMLDivElement>(null)
  const loaderTxtRef = useRef<HTMLDivElement>(null)
  const exitLoaderRef = useRef<HTMLDivElement>(null)
  const homeRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.stack-card')
    const initImgRotate = [-10.5, 12.5, -15.5, 13.5, -7.5, 8.5]
    const spans = loaderTxtRef.current?.querySelectorAll('.char') || []

    const lodingPercent = loaderTxtRef.current?.querySelectorAll('.loading-percent span') || []

    cards.forEach((card) => {
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
    for (const [index, card] of cards.entries()) {
      tl.to(card, {
        rotation: initImgRotate[index],
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2,
      }, index * 0.2)
    }

    tl.to(spans, {
      delay: 0.8,
      y: 0,
      duration: 1,
      ease: loaderEaseIn,
      stagger: { each: 0.09, from: 'random' },
    }, 0)

    for (const [index, card] of cards.slice().reverse().entries()) {
      tl.to(card, {
        delay: 2.80,
        rotation: 0,
        scale: 0,
        duration: 1,
        ease: 'power2.in',
        stagger: 0.2,
      }, index * 0.2)
    }

    tl.to(spans, {
      y: "100%",
      duration: 1,
      ease: 'power2.out',
      stagger: { each: 0.07, from: 'random' },
    }, "=-1.5")
     

    tl.to(exitLoaderRef.current, {
      y: "0%",
      duration: 1,
      ease: loaderPanelEase,
    }, "=-1.3")

    tl.to(exitLoaderRef.current, {
      y: "100%",
      duration: 1,
      ease: loaderPanelEase
    }, "=-0.59")
    tl.to(homeRef.current, {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, "=-0.5")
  }, { scope: boxRef })

  return (
    <div className="w-full relative min-h-screen flex items-center justify-center bg-black overflow-hidden" ref={boxRef}>
        {imgs.map((item, index) => (
          <div
            key={item}
            className="absolute inset-0 w-62.5 h-75 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 pointer-events-none"
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
          {loaderTxt.split("").map((letter, index) => (
            <p key={index} className="overflow-hidden bg-transparent">
              <span className="char inline-block translate-y-full text-white mix-blend-difference bg-transparent">
                {letter}
              </span>
            </p>
          ))}
        </h1>
        <div ref={exitLoaderRef} className="absolute inset-0 w-full h-full z-50 transform -translate-y-full bg-slate-200"/>
        <div ref={homeRef} className="absolute inset-0 w-full h-full opacity-0 z-10">
          <HomeUI />
        </div>
    </div>
  )
}
