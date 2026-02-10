"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MeshGradient } from "@paper-design/shaders-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RotateCcw, Send } from "lucide-react"
import { TypingText } from "@/components/typing-text"
import { FadeIn } from "@/components/fade-in"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ConnectPage() {
  const [visitorName, setVisitorName] = useState<string>("")
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [showFooter, setShowFooter] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [email, setEmail] = useState("")
  const [showEmailField, setShowEmailField] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedTab, setSelectedTab] = useState("building")
  const [otherComment, setOtherComment] = useState("")
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

  const handleSendNote = async () => {
    const finalFeedback = selectedTab === "other" ? otherComment : feedback
    if (!finalFeedback.trim()) return
    setShowEmailField(true)
  }

  const handleSubmitFeedback = async () => {
    const finalFeedback = selectedTab === "other" ? otherComment : feedback
    if (!finalFeedback.trim() || !email.trim()) return
    
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/send-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback: finalFeedback, email }),
      })
      
      if (response.ok) {
        setSubmitted(true)
      } else {
        alert('Failed to send feedback. Please try again.')
      }
    } catch (error) {
      alert('Failed to send feedback. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
          colors={["hsl(216, 90%, 27%)", "hsl(243, 68%, 36%)", "hsl(205, 91%, 64%)", "hsl(211, 61%, 57%)"]}
        />
      </div>

      <div className="relative z-10">
        <main className="flex items-center justify-center min-h-screen p-4 my-0">
          <div className="w-full max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-2xl font-sans leading-tight min-h-[80px]">
                <TypingText 
                  text={`I really appreciate the time you've taken to get to know me, ${visitorName}!`}
                  speed={45}
                  onComplete={() => setShowSubtitle(true)}
                />
              </h1>
              <FadeIn delay={0} show={showSubtitle}>
                <p className="text-lg md:text-xl text-white/80 drop-shadow-xl leading-relaxed max-w-lg mx-auto min-h-[60px]">
                  <TypingText
                    text="Your time means a lot to me, and I'd love to hear what impressed you the most about what I do."
                    speed={35}
                    onComplete={() => setShowCard(true)}
                  />
                </p>
              </FadeIn>
            </div>

            <FadeIn delay={200} show={showCard}>
              {!submitted ? (
                <Card className="w-full max-w-lg mx-auto backdrop-blur-xl bg-slate-900/30 border-white/20 shadow-2xl">
                  <CardContent className="pt-8 pb-6 px-8">
                    <div className="flex flex-col gap-4">
                      <FadeIn delay={300} show={showCard}>
                        <div className="space-y-4">
                          <label className="text-white/80 text-sm">What impressed you the most about what I do?</label>
                          
                          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 bg-white/10 border-white/20 p-2 h-auto">
                              <TabsTrigger 
                                value="building" 
                                className="data-[state=active]:bg-white/25 text-white/90 data-[state=active]:text-white border border-white/20 rounded-lg px-3 py-4 text-sm md:text-base font-medium transition-all duration-200 hover:bg-white/15"
                              >
                                <span className="hidden md:inline">Building in Africa</span>
                                <span className="md:hidden">Africa</span>
                              </TabsTrigger>
                              <TabsTrigger 
                                value="cxguru" 
                                className="data-[state=active]:bg-white/25 text-white/90 data-[state=active]:text-white border border-white/20 rounded-lg px-3 py-4 text-sm md:text-base font-medium transition-all duration-200 hover:bg-white/15"
                              >
                                <span className="hidden md:inline">CXGURU Products</span>
                                <span className="md:hidden">CXGURU</span>
                              </TabsTrigger>
                              <TabsTrigger 
                                value="movement" 
                                className="data-[state=active]:bg-white/25 text-white/90 data-[state=active]:text-white border border-white/20 rounded-lg px-3 py-4 text-sm md:text-base font-medium transition-all duration-200 hover:bg-white/15"
                              >
                                <span className="hidden md:inline">Wise Aging</span>
                                <span className="md:hidden">Movement</span>
                              </TabsTrigger>
                              <TabsTrigger 
                                value="other" 
                                className="data-[state=active]:bg-white/25 text-white/90 data-[state=active]:text-white border border-white/20 rounded-lg px-3 py-4 text-sm md:text-base font-medium transition-all duration-200 hover:bg-white/15"
                              >
                                <span className="hidden md:inline">Other</span>
                                <span className="md:hidden">Other</span>
                              </TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="building" className="mt-4">
                              <Textarea
                                className="border-white/30 bg-white/10 text-white placeholder:text-white/50 backdrop-blur-sm min-h-[100px] resize-none"
                                placeholder="Tell me what impressed you about building in Africa..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                              />
                            </TabsContent>
                            
                            <TabsContent value="cxguru" className="mt-4">
                              <Textarea
                                className="border-white/30 bg-white/10 text-white placeholder:text-white/50 backdrop-blur-sm min-h-[100px] resize-none"
                                placeholder="Share your thoughts on the customer management products from CXGURU..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                              />
                            </TabsContent>
                            
                            <TabsContent value="movement" className="mt-4">
                              <Textarea
                                className="border-white/30 bg-white/10 text-white placeholder:text-white/50 backdrop-blur-sm min-h-[100px] resize-none"
                                placeholder="What are your thoughts on the Wise Aging & Intelligent Young Movement..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                              />
                            </TabsContent>
                            
                            <TabsContent value="other" className="mt-4">
                              <Textarea
                                className="border-white/30 bg-white/10 text-white placeholder:text-white/50 backdrop-blur-sm min-h-[100px] resize-none"
                                placeholder="Type other comment here..."
                                value={otherComment}
                                onChange={(e) => setOtherComment(e.target.value)}
                              />
                            </TabsContent>
                          </Tabs>
                        </div>
                      </FadeIn>
                      
                      {!showEmailField ? (
                        <FadeIn delay={400} show={showCard}>
                          <Button
                            onClick={handleSendNote}
                            disabled={!(selectedTab === "other" ? otherComment.trim() : feedback.trim())}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Send className="mr-2 h-5 w-5" />
                            Send Note to Theo
                          </Button>
                        </FadeIn>
                      ) : (
                        <FadeIn delay={400} show={showCard}>
                          <div className="space-y-2">
                            <label className="text-white/80 text-sm">Enter your email address</label>
                            <Input
                              className="border-white/30 bg-white/10 text-white placeholder:text-white/50 backdrop-blur-sm"
                              type="email"
                              placeholder="your.email@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button
                              onClick={handleSubmitFeedback}
                              disabled={!email.trim() || isSubmitting}
                              className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {isSubmitting ? 'Sending...' : 'Send Note'}
                            </Button>
                          </div>
                        </FadeIn>
                      )}

                      <FadeIn delay={600} show={showCard}>
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
              ) : (
                <Card className="w-full max-w-lg mx-auto backdrop-blur-xl bg-slate-900/30 border-white/20 shadow-2xl">
                  <CardContent className="pt-8 pb-6 px-8 text-center">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">Thank you for your feedback!</h3>
                      <p className="text-white/80">I really appreciate you taking the time to share your thoughts.</p>
                      <Button
                        onClick={() => router.push('/schedule')}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 py-6 text-base"
                      >
                        Schedule a 15-min call with Theo
                      </Button>
                      <Button
                        onClick={handleStartOver}
                        variant="ghost"
                        className="w-full text-white/70 hover:text-white hover:bg-white/10"
                      >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Start Over
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </FadeIn>

          </div>
        </main>
      </div>
    </div>
  )
}
