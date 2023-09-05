import { FC, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FlatList, HStack, Heading, Text, VStack } from 'native-base'

import { Header } from './components/Header'
import { Group, GroupSkeleton } from './components/Group'
import { ExerciseCard, ExerciseCardSkeleton } from './components/ExerciseCard'
import { Skeleton } from '~/components/Skeleton'

import { AppNavigatorRouteProps } from '~/routes/app.routes'

import { useFetchGroupsQuery } from '~/hooks/useFetchGroupsQuery'
import { useFetchExercisesByGroup } from '~/hooks/useFetchExercisesByGroupQuery'

export const Home: FC = () => {
  const navigation = useNavigation<AppNavigatorRouteProps>()
  const handleOpenExerciseDetails = () => {
    navigation.navigate('exercise')
  }
  const [groupSelectedIndex, setGroupSelectedIndex] = useState<number>(0)

  const { groups, isLoadingGroups } = useFetchGroupsQuery()

  const groupsSelectedValue = groups?.[groupSelectedIndex]

  const { exercises, isLoadingExercises } = useFetchExercisesByGroup({
    enabled: !!groupsSelectedValue,
    groupName: groupsSelectedValue,
  })

  return (
    <VStack flex={1} testID="home-container">
      <Header />

      <HStack my={10}>
        {isLoadingGroups ? (
          <GroupSkeleton />
        ) : (
          <FlatList
            data={groups}
            keyExtractor={(i) => i}
            renderItem={({ item, index }) => (
              <Group
                label={item}
                mr={3}
                isActive={
                  groupsSelectedValue?.toLowerCase() === item.toLowerCase()
                }
                onPress={() => setGroupSelectedIndex(index)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            _contentContainerStyle={{
              px: 8,
            }}
            // my={10}
            flexGrow={0}
          />
        )}
      </HStack>

      {isLoadingExercises ? (
        <VStack flex={1} px={8}>
          <Skeleton.SM h="25.6px" w={20} mb={3} />
          <ExerciseCardSkeleton />
        </VStack>
      ) : (
        <VStack flex={1} px={8}>
          <HStack justifyContent="space-between" mb={3}>
            <Heading
              color="gray.100"
              fontSize="md"
              lineHeight="md-160"
              fontFamily="heading"
            >
              Exercises
            </Heading>

            <Text color="gray.100" fontSize="sm" lineHeight="sm-160">
              {exercises?.length}
            </Text>
          </HStack>

          <FlatList
            data={exercises}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <ExerciseCard
                exercise={item}
                onPress={handleOpenExerciseDetails}
              />
            )}
            contentContainerStyle={{ gap: 12, paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
          />
        </VStack>
      )}
    </VStack>
  )
}
