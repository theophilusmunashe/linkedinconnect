"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MeshGradient } from "@paper-design/shaders-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw, Calendar } from "lucide-react"
import { TypingText } from "@/components/typing-text"
import { FadeIn } from "@/components/fade-in"

export default function SchedulePage() {
  const [visitorName, setVisitorName] = useState<string>("")
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [showCalendly, setShowCalendly] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const name = localStorage.getItem("visitorName")
    if (!name) {
      router.push("/")
      return
    }
    setVisitorName(name)
  }, [router])

  const handleStartOver = () => {
    localStorage.removeItem("visitorName")
    router.push("/")
  }

  const openCalendly = () => {
    setShowCalendly(true)
    // Open Calendly in a new tab
    window.open('https://calendly.com/theophilus-cxguru-io/15min', '_blank')
  }

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
          colors={["hsl(200, 70%, 35%)", "hsl(220, 68%, 45%)", "hsl(180, 60%, 50%)", "hsl(240, 61%, 57%)"]}
        />
      </div>

      <div className="relative z-10">
        <main className="flex items-center justify-center min-h-screen p-4 my-0">
          <div className="w-full max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-2xl font-sans leading-tight min-h-[80px]">
                <TypingText 
                  text={`Let's connect for a 15-minute call, ${visitorName}!`}
                  speed={45}
                  onComplete={() => setShowSubtitle(true)}
                />
              </h1>
              <FadeIn delay={0} show={showSubtitle}>
                <p className="text-lg md:text-xl text-white/80 drop-shadow-xl leading-relaxed max-w-lg mx-auto min-h-[60px]">
                  <TypingText
                    text="I'd love to learn more about you and explore how we can collaborate. Choose a time that works best for you."
                    speed={35}
                    onComplete={() => setShowCard(true)}
                  />
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={200} show={showCard}>
              <Card className="w-full max-w-lg mx-auto backdrop-blur-xl bg-slate-900/30 border-white/20 shadow-2xl">
                <CardContent className="pt-8 pb-6 px-8">
                  <div className="flex flex-col gap-4">
                    <FadeIn delay={300} show={showCard}>
                      <div className="space-y-4">
                        <div className="text-center space-y-2">
                          <Calendar className="h-12 w-12 mx-auto text-white/80" />
                          <h3 className="text-xl font-semibold text-white">Select a Date and Time</h3>
                          <p className="text-white/70 text-sm">
                            Click below to open my calendar and choose a convenient time
                          </p>
                        </div>
                        
                        <Button
                          onClick={openCalendly}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-base"
                        >
                          <Calendar className="mr-2 h-5 w-5" />
                          Schedule Meeting on Theo's Calendly
                        </Button>
                        
                        {showCalendly && (
                          <p className="text-white/60 text-sm text-center">
                            Calendly opened in a new tab. Complete your booking there!
                          </p>
                        )}
                      </div>
                    </FadeIn>

                    <FadeIn delay={500} show={showCard}>
                      <Button
                        onClick={handleStartOver}
                        variant="ghost"
                        className="w-full text-white/70 hover:text-white hover:bg-white/10 mt-2"
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Start Over
                      </Button>
                    </FadeIn>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={800} show={showCard}>
              <div className="pt-4 text-sm text-white/60 drop-shadow-lg">
                <TypingText
                  text={`Looking forward to our conversation, ${visitorName}!`}
                  speed={30}
                />
              </div>
            </FadeIn>
          </div>
        </main>
      </div>
    </div>
  )
}
