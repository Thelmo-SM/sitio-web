'use client'

import { useInView } from '@/hooks/useInView'

interface Props {
  children: React.ReactNode
  animation?: 'fade-up' | 'fade-left' | 'zoom' | 'blur'
  delay?: number
}

export function AnimateOnScroll({
  children,
  animation = 'fade-up',
  delay = 0,
}: Props) {
  const { ref, isVisible } = useInView<HTMLDivElement>({
    threshold: 0.2,
  })

  const animations = {
    'fade-up': isVisible
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-10',

    'fade-left': isVisible
      ? 'opacity-100 translate-x-0'
      : 'opacity-0 -translate-x-10',

    zoom: isVisible
      ? 'opacity-100 scale-100'
      : 'opacity-0 scale-90',

    blur: isVisible
      ? 'opacity-100 blur-0'
      : 'opacity-0 blur-md',
  }

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`
        transition-all duration-700 ease-out
        ${animations[animation]}
      `}
    >
      {children}
    </div>
  )
}
