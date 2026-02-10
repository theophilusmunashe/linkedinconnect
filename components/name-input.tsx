"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function NameInput() {
  const [name, setName] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (name.endsWith(".")) {
      const cleanName = name.slice(0, -1).trim()
      if (cleanName.length > 0) {
        localStorage.setItem("visitorName", cleanName)
        router.push("/intro")
      }
    }
  }, [name, router])

  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-xl bg-slate-900/30 border-white/20 shadow-2xl">
      <CardHeader className="text-center pb-2">
        <p className="text-white/80 text-sm italic">Type your name and end with a full stop to continue</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            className="border-white/30 bg-white/10 text-white placeholder:text-white/50 backdrop-blur-sm text-lg py-6 text-center focus:ring-2 focus:ring-white/40 focus:border-white/40"
            type="text"
            placeholder="Write it here."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
        </div>
      </CardContent>
    </Card>
  )
}
