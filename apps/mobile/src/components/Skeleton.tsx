import { Skeleton as SkeletonPrimitive } from 'native-base'
import { InterfaceSkeletonProps } from 'native-base/src/components/composites/Skeleton/types'

const BaseSkeleton = ({ children, ...props }: InterfaceSkeletonProps) => (
  <SkeletonPrimitive
    {...props}
    rounded="sm"
    endColor="gray.300"
    startColor="gray.400"
  >
    {children}
  </SkeletonPrimitive>
)
const SM = (props: InterfaceSkeletonProps) =>
  BaseSkeleton({ rounded: 'sm', ...props })
const MD = (props: InterfaceSkeletonProps) =>
  BaseSkeleton({ rounded: 'md', ...props })
const LG = (props: InterfaceSkeletonProps) =>
  BaseSkeleton({ rounded: 'lg', ...props })

export const Skeleton = { MD, SM, LG }
