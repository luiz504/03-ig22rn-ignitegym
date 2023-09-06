import { FC } from 'react'
import { Center, Heading } from 'native-base'

type HeaderProps = {
  title: string
}
export const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <Center pb={6} pt={16} px={4} bg="gray.600">
      <Heading
        color="gray.100"
        fontSize="xl"
        fontFamily="heading"
        lineHeight="xl-160"
      >
        {title}
      </Heading>
    </Center>
  )
}
