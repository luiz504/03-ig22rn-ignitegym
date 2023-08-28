import { FC, useState } from 'react'
import { FlatList, HStack, Heading, Text, VStack } from 'native-base'

import { Header } from './components/Header'
import { Group } from './components/Group'
import { ExerciseCard } from './components/ExerciseCard'

export const Home: FC = () => {
  const [groups] = useState([
    'back',
    'Chest',
    'shoulder',
    'biceps',
    'triceps',
    'quadriceps',
  ])

  const [groupSelected, setGroupSelected] = useState<string>('back')

  const [exercises] = useState([
    'High Row',
    'High Row',
    'High Row',
    'High Row',
    'High Row',
    'High Row',
    'High Row',
    'High Row',
    'High Row',
    'High Row',
    'High Row',
    'High Row',
  ])

  return (
    <VStack flex={1}>
      <Header />

      <FlatList
        data={groups}
        keyExtractor={(i) => i}
        renderItem={({ item }) => (
          <Group
            label={item}
            mr={3}
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{
          px: 8,
        }}
        my={10}
        flexGrow={0}
      />
      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={3}>
          <Heading color="gray.100" fontSize="md" lineHeight="md-160">
            Exercises
          </Heading>

          <Text color="gray.100" fontSize="sm" lineHeight="sm-160">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item }) => <ExerciseCard exercise={item} />}
          contentContainerStyle={{ gap: 12, paddingBottom: 80 }}
          showsVerticalScrollIndicator={false}
        />
      </VStack>
    </VStack>
  )
}
