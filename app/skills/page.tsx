"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MeshGradient } from "@paper-design/shaders-react"
import { BioCard } from "@/components/bio-card"
import { TypingText } from "@/components/typing-text"
import { FadeIn } from "@/components/fade-in"

export default function SkillsPage() {
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
          colors={["hsl(340, 70%, 40%)", "hsl(320, 65%, 45%)", "hsl(350, 75%, 50%)", "hsl(330, 60%, 55%)"]}
        />
      </div>

      <div className="relative z-10">
        <main className="flex items-center justify-center min-h-screen p-4 my-0">
          <div className="w-full max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-2xl font-sans leading-tight min-h-[80px]">
                <TypingText 
                  text={`Good question, ${visitorName}!`}
                  speed={45}
                  onComplete={() => setShowSubtitle(true)}
                />
              </h1>
              <FadeIn delay={0} show={showSubtitle}>
                <p className="text-lg md:text-xl text-white/80 drop-shadow-xl leading-relaxed max-w-lg mx-auto min-h-[80px]">
                  <TypingText
                    text="My top skills? Software Development , Appreciative Inquiry, Team Leadership, and Business Development. I know, quite the combo right?"
                    speed={35}
                    onComplete={() => setShowCard(true)}
                  />
                </p>
              </FadeIn>
            </div>

            {showCard && (
              <BioCard
                content={`I combine my expertise in full-stack development with Agile methodologies to lead talented remote teams. I'm always exploring opportunities in tech, leadership, and honestly ${visitorName}, I'm driven by the desire to create real societal change through innovation.`}
                buttonText="Let's connect, Theo!"
                nextPage="/wise-aging"
                delay={200}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
