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
    const interval = setInterval(() => {
      setAnimateOut(true)

      setTimeout(() => {
        setAnimateOut(false)
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length)
        setAnimateIn(true)
      }, 1000)
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [words])

  useEffect(() => {
    if (animateIn) {
      setTimeout(() => {
        setAnimateIn(false)
      }, 1000)
    }
  }, [animateIn])

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
