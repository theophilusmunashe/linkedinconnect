"use client"

import React from "react"

import { useState, useEffect } from "react"

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  className?: string
  show?: boolean
}

export function FadeIn({ children, delay = 0, className = "", show = true }: FadeInProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!show) return
    
    const timer = setTimeout(() => {
      setVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, show])

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        visible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  )
}
