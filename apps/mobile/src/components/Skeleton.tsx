import { Skeleton as SkeletonPrimitive } from 'native-base'
import { InterfaceSkeletonProps } from 'native-base/src/components/composites/Skeleton/types'

const MD = ({ children, ...props }: InterfaceSkeletonProps) => (
  <SkeletonPrimitive
    {...props}
    rounded={'md'}
    endColor="gray.300"
    startColor="gray.400"
  >
    {children}
  </SkeletonPrimitive>
)
const SM = ({ children, ...props }: InterfaceSkeletonProps) => (
  <SkeletonPrimitive
    {...props}
    rounded="sm"
    endColor="gray.300"
    startColor="gray.400"
  >
    {children}
  </SkeletonPrimitive>
)

export const Skeleton = { MD, SM }
