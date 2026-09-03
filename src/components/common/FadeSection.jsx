import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { EASE } from '../../utils/astrologyCalculations.js'

export default function FadeSection({ children, className, ...rest }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 'some' })

  const [belowFoldAtMount, setBelowFoldAtMount] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (el && el.getBoundingClientRect().top > window.innerHeight) {
      setBelowFoldAtMount(true)
    }
  }, [])

  const playEntrance = !reduce && belowFoldAtMount && inView

  return (
    <motion.section
      ref={ref}
      className={className}
      initial={false}
      animate={
        playEntrance ? { opacity: [0, 1], y: [24, 0] } : { opacity: 1, y: 0 }
      }
      transition={reduce ? { duration: 0 } : { duration: 0.5, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.section>
  )
}
