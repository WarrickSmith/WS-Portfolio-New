import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/cn'

type DimmedBackdropProps = HTMLMotionProps<'div'> & {
  className?: string
}

const DimmedBackdrop = ({ className, ...props }: DimmedBackdropProps) => {
  return (
    <motion.div
      aria-hidden="true"
      className={cn('dimmed-backdrop-layer fixed inset-0 z-10 bg-black', className)}
      {...props}
    />
  )
}

export default DimmedBackdrop
