import { NameInput } from "@/components/name-input"
import { MeshGradient } from "@paper-design/shaders-react"

export default function Home() {
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
            <div className="space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-2xl font-sans leading-tight text-balance">
                Thanks for connecting with me on LinkedIn
              </h1>
              <p className="text-xl md:text-2xl text-white/90 drop-shadow-xl leading-relaxed">
                {"I'm"} <span className="font-semibold text-white">Theophilus</span>, yes I have picked your name on LinkedIn but what would you like me to call you?
              </p>
            </div>

            <NameInput />

            <div className="pt-4 text-sm text-white/60 drop-shadow-lg">
              <p>Hint: Type your name and end with a full stop to continue</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
