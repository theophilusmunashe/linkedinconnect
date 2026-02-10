"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MeshGradient } from "@paper-design/shaders-react"
import { BioCard } from "@/components/bio-card"
import { TypingText } from "@/components/typing-text"
import { FadeIn } from "@/components/fade-in"

export default function WorkingOnPage() {
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
          colors={["hsl(30, 80%, 40%)", "hsl(45, 75%, 50%)", "hsl(15, 70%, 45%)", "hsl(50, 65%, 55%)"]}
        />
      </div>

      <div className="relative z-10">
        <main className="flex items-center justify-center min-h-screen p-4 my-0">
          <div className="w-full max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-2xl font-sans leading-tight min-h-[80px]">
                <TypingText 
                  text="But wait, there's more..."
                  speed={45}
                  onComplete={() => setShowSubtitle(true)}
                />
              </h1>
              <FadeIn delay={0} show={showSubtitle}>
                <p className="text-lg md:text-xl text-white/80 drop-shadow-xl leading-relaxed max-w-lg mx-auto min-h-[80px]">
                  <TypingText
                    text="I'm also the Co-Founder of WeNext Africa. We're focused on empowering the next generation of African innovators."
                    speed={35}
                    onComplete={() => setShowCard(true)}
                  />
                </p>
              </FadeIn>
            </div>

            {showCard && (
              <BioCard
                content={`Here's something interesting, ${visitorName}. My journey started with Software Engineering internships at Microgrid Global Solutions, then I worked at QuiverSoft IT Solutions, and I even did a stint as a Computer Network Specialist at Mastercard. Oh, and I have a Bachelor's in Computer Systems Engineering from Midlands State University.`}
                buttonText="Impressive! What are you good at?"
                nextPage="/skills"
                delay={200}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
