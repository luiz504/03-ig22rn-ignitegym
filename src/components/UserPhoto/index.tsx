import { IImageProps, Image } from 'native-base'
import { FC } from 'react'

export interface UserPhotoProps extends IImageProps {
  size: number
}

export const UserPhoto: FC<UserPhotoProps> = ({ size = 64, alt, ...rest }) => {
  return (
    <Image
      alt={alt}
      w={size}
      h={size}
      rounded="full"
      borderWidth={2}
      borderColor={'gray.400'}
      {...rest}
    />
  )
}