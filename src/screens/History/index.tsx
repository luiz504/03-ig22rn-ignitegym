import { FC, useState } from 'react'

import { Heading, SectionList, Text, VStack } from 'native-base'

import { Header } from '~/components/Header'
import { HistoryCard } from './components/HistoryCard'

export const History: FC = () => {
  const [exercises] = useState([
    { title: '26.08.22', data: ['Front Pull', 'Side Row'] },
    {
      title: '25.08.22',
      data: ['Front Pull'],
    },
    { title: '26.08.22', data: ['Front Pull', 'Side Row'] },
    { title: '26.08.22', data: ['Front Pull', 'Side Row'] },
    { title: '26.08.22', data: ['Front Pull', 'Side Row'] },
  ])
  return (
    <VStack flex={1}>
      <Header title="Exercises History" />

      <SectionList
        sections={exercises}
        keyExtractor={(item) => item}
        renderSectionHeader={({ section }) => (
          <Heading
            mt={7}
            mb={3}
            color="gray.200"
            fontSize="md"
            lineHeight="md-160"
            fontFamily="heading"
          >
            {section.title}
          </Heading>
        )}
        renderItem={() => <HistoryCard mb={3} />}
        showsHorizontalScrollIndicator={false}
        px={8}
        contentContainerStyle={[
          !exercises.length && { flex: 1, justifyContent: 'center' },
        ]}
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            There is no history of registered exercises yet. {'\n'}
            Let`&apos;s change it today!
          </Text>
        )}
      />
    </VStack>
  )
}
