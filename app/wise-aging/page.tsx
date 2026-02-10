"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MeshGradient } from "@paper-design/shaders-react"
import { BioCard } from "@/components/bio-card"
import { TypingText } from "@/components/typing-text"
import { FadeIn } from "@/components/fade-in"

export default function WiseAgingPage() {
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
          colors={["hsl(280, 60%, 40%)", "hsl(300, 55%, 45%)", "hsl(260, 65%, 50%)", "hsl(290, 70%, 55%)"]}
        />
      </div>

      <div className="relative z-10">
        <main className="flex items-center justify-center min-h-screen p-4 my-0">
          <div className="w-full max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-2xl font-sans leading-tight min-h-[80px]">
                <TypingText 
                  text={`But there's something else I'm passionate about, ${visitorName}...`}
                  speed={45}
                  onComplete={() => setShowSubtitle(true)}
                />
              </h1>
              <FadeIn delay={0} show={showSubtitle}>
                <p className="text-lg md:text-xl text-white/80 drop-shadow-xl leading-relaxed max-w-lg mx-auto min-h-[120px]">
                  <TypingText
                    text="In 2026, I'm leading a movement called 'The Wise Aging and The Intelligent Young Movement'. We're on a mission to create a platform where young people can sit with our elders and have real, unfiltered conversations about workplace challenges and how we can bridge generational gaps to form unstoppable teams."
                    speed={35}
                    onComplete={() => setShowCard(true)}
                  />
                </p>
              </FadeIn>
            </div>

            {showCard && (
              <BioCard
                content={`Every Thursday, we drop new episodes featuring these powerful intergenerational dialogues. Imagine the wisdom of experience meeting the energy of innovation - that's what we're building. It's about creating teams where age becomes a strength, not a barrier, and where every voice matters regardless of how many years you've been on this earth.`}
                buttonText="This is powerful! Let's connect"
                nextPage="/connect"
                delay={200}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
