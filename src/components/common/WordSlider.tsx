import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/cn'

interface WordSliderProps {
  reducedMotionText?: string
  words: string[]
}

const WordSlider = ({ reducedMotionText, words }: WordSliderProps) => {
  const prefersReducedMotion = useReducedMotion()
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [animateIn, setAnimateIn] = useState(false)
  const [animateOut, setAnimateOut] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion || words.length === 0) return

    let pendingTimeout: ReturnType<typeof setTimeout> | null = null

    const interval = setInterval(() => {
      setAnimateOut(true)

      pendingTimeout = setTimeout(() => {
        setAnimateOut(false)
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
        setAnimateIn(true)
      }, 1000)
    }, 3000)

    return () => {
      clearInterval(interval)
      if (pendingTimeout !== null) clearTimeout(pendingTimeout)
    }
  }, [prefersReducedMotion, words])

  useEffect(() => {
    if (prefersReducedMotion) return

    if (animateIn) {
      const timer = setTimeout(() => {
        setAnimateIn(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [animateIn, prefersReducedMotion])

  if (words.length === 0) {
    return <div className="flex w-full items-center justify-center" />
  }

  if (prefersReducedMotion) {
    return (
      <div className="flex w-full items-center justify-center">
        <span className="text-emphasis text-text-accent">
          {reducedMotionText ?? words[currentWordIndex]}
        </span>
      </div>
    )
  }

  return (
    <div className="flex w-full items-center justify-center">
      <span
        className={cn(
          'text-emphasis text-text-accent',
          animateIn && 'animate-slide-in',
          animateOut && 'animate-slide-out'
        )}
      >
        {words[currentWordIndex]}
      </span>
    </div>
  )
}

export default WordSlider
