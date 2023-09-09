import { FC } from 'react'

import { Heading, SectionList, Text, VStack } from 'native-base'

import { useFetchHistory } from '~/hooks/queries/useFetchHistory'

import { Header } from '~/components/Header'
import { HistoryCard, HistoryCardSkeleton } from './components/HistoryCard'
import { Skeleton } from '~/components/Skeleton'

export const History: FC = () => {
  const { histories, isLoading } = useFetchHistory()

  return (
    <VStack flex={1}>
      <Header title="Exercises History" />

      {isLoading && (
        <VStack px={8} testID="skeleton-container">
          <Skeleton.SM mb={2} mt={7} h="md-160" w="90px" />
          <HistoryCardSkeleton />
        </VStack>
      )}

      {!isLoading && (
        <SectionList
          sections={histories}
          keyExtractor={(item) => String(item.id)}
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
          renderItem={({ item, section: { title } }) => (
            <HistoryCard mb={3} data={item} testID={`history-card-${title}`} />
          )}
          showsHorizontalScrollIndicator={false}
          px={8}
          contentContainerStyle={[
            !histories.length && { flex: 1, justifyContent: 'center' },
          ]}
          ListEmptyComponent={() => (
            <Text color="gray.100" textAlign="center" testID="empty-feedback">
              There is no history of registered exercises yet. {'\n'}
              Let`&apos;s change it today!
            </Text>
          )}
        />
      )}
    </VStack>
  )
}
