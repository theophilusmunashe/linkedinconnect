"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Sparkles } from "lucide-react"
import { TypingText } from "@/components/typing-text"
import { FadeIn } from "@/components/fade-in"

interface BioCardProps {
  content: string
  buttonText: string
  nextPage?: string
  showBackButton?: boolean
  delay?: number
}

export function BioCard({ content, buttonText, nextPage, showBackButton = false, delay = 0 }: BioCardProps) {
  const router = useRouter()
  const [showButton, setShowButton] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <FadeIn delay={delay}>
      <Card className={`w-full max-w-lg mx-auto backdrop-blur-xl bg-slate-900/40 border-white/30 shadow-2xl transition-all duration-300 ${isHovered ? 'shadow-3xl border-white/40 scale-[1.02]' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <CardContent className="pt-8 pb-6 px-8">
          <div className="relative">
            <div className="absolute -top-2 -right-2 opacity-20">
              <Sparkles className="h-6 w-6 text-white animate-pulse" />
            </div>
            <p className="text-white text-lg leading-relaxed mb-8 text-center min-h-[80px] font-medium drop-shadow-lg">
              <TypingText 
                text={content} 
                speed={30} 
                onComplete={() => setShowButton(true)}
              />
            </p>
          </div>
          <FadeIn delay={0} show={showButton}>
            <div className="flex flex-col gap-3">
              {nextPage && (
                <Button
                  onClick={() => router.push(nextPage)}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/40 backdrop-blur-sm py-6 text-base transform hover:scale-[1.05] active:scale-[0.98]"
                >
                  {buttonText}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              )}
              {showBackButton && (
                <Button
                  onClick={() => router.push("/")}
                  variant="ghost"
                  className="w-full text-white/80 hover:text-white hover:bg-white/20 border border-white/20 transition-all duration-300 py-3"
                >
                  Start Over
                </Button>
              )}
            </div>
          </FadeIn>
        </CardContent>
      </Card>
    </FadeIn>
  )
}
