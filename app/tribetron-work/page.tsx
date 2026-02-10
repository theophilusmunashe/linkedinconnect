"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MeshGradient } from "@paper-design/shaders-react"
import { BioCard } from "@/components/bio-card"
import { TypingText } from "@/components/typing-text"
import { FadeIn } from "@/components/fade-in"

export default function TribetronWorkPage() {
  const [visitorName, setVisitorName] = useState<string>("")
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const name = localStorage.getItem("visitorName")
    if (!name) {
      router.push("/")
      return
    }
    setVisitorName(name)
  }, [router])

  if (!visitorName) {
    return null
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-900">
      <div className="fixed inset-0 z-0">
        <MeshGradient
          style={{ height: "100vh", width: "100vw" }}
          distortion={0.8}
          swirl={0.1}
          offsetX={0}
          offsetY={0}
          scale={1}
          rotation={0}
          speed={1}
          colors={["hsl(220, 70%, 35%)", "hsl(200, 68%, 45%)", "hsl(240, 60%, 50%)", "hsl(180, 61%, 57%)"]}
        />
      </div>

      <div className="relative z-10">
        <main className="flex items-center justify-center min-h-screen p-4 my-0">
          <div className="w-full max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-2xl font-sans leading-tight min-h-[80px]">
                <TypingText 
                  text={`Let me tell you about our work at Tribetron, ${visitorName}...`}
                  speed={45}
                  onComplete={() => setShowSubtitle(true)}
                />
              </h1>
              <FadeIn delay={0} show={showSubtitle}>
                <p className="text-lg md:text-xl text-white/80 drop-shadow-xl leading-relaxed max-w-lg mx-auto min-h-[100px]">
                  <TypingText
                    text="At Tribetron, we've built some really robust software solutions that have made a real impact. We've had the privilege of working with some amazing brands across Africa."
                    speed={35}
                    onComplete={() => setShowCard(true)}
                  />
                </p>
              </FadeIn>
            </div>

            {showCard && (
              <BioCard
                content={`We've partnered with major financial institutions like Old Mutual Malawi, Old Mutual Zimbabwe, and ZB Financial Holdings to build enterprise-grade systems that handle thousands of transactions daily. Currently at CXGURU, we've developed a comprehensive customer feedback management system and a compliance system that's being used by call centers across South Africa to ensure they meet regulatory standards while delivering excellent customer service.`}
                buttonText="That's incredible! What else?"
                nextPage="/working-on"
                delay={200}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
