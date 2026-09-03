import { motion } from 'motion/react'

export default function Button({
  children,
  as = 'a',
  className = 'btn btn-solid',
  ...rest
}) {
  const Comp = as === 'button' ? motion.button : motion.a
  return (
    <Comp
      className={className}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
