"use client"

import { useState, useEffect } from "react"

interface TypingTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
  onComplete?: () => void
}

export function TypingText({ 
  text, 
  className = "", 
  speed = 40,
  delay = 0,
  onComplete 
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [started, setStarted] = useState(false)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setStarted(true)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [delay])

  useEffect(() => {
    if (!started) return

    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1))
      }, speed)
      return () => clearTimeout(timer)
    } else if (!completed) {
      setCompleted(true)
      onComplete?.()
    }
  }, [displayedText, text, speed, started, completed, onComplete])

  if (!started) return null

  return (
    <span className={className}>
      {displayedText}
      {displayedText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  )
}
