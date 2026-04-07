import { useEffect, useState } from 'react'
import { cn } from '../../lib/cn'

interface WordSliderProps {
  words: string[]
}

const WordSlider = ({ words }: WordSliderProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [animateIn, setAnimateIn] = useState(false)
  const [animateOut, setAnimateOut] = useState(false)

  useEffect(() => {
    if (words.length === 0) return

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
  }, [words])

  useEffect(() => {
    if (animateIn) {
      const timer = setTimeout(() => {
        setAnimateIn(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [animateIn])

  if (words.length === 0) {
    return <div className="flex w-full items-center justify-center" />
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
