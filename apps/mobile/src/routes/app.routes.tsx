import {
  createBottomTabNavigator,
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs'

import HomeIcon from '~/assets/icons/home.svg'
import HistoryIcon from '~/assets/icons/history.svg'
import ProfileIcon from '~/assets/icons/profile.svg'

import { Home } from '~/screens/Home'
import { History } from '~/screens/History'
import { Profile } from '~/screens/Profile'
import { Exercise } from '~/screens/Exercise'
import { useTheme } from 'native-base'

type AppRoutes = {
  home: undefined
  exercise: { exerciseId: number }
  history: undefined
  profile: undefined
}

export type AppNavigatorRouteProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { sizes, colors } = useTheme()

  const iconSize = sizes[6]

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.green[500],
        tabBarInactiveTintColor: colors.gray[200],
        tabBarStyle: {
          backgroundColor: colors.gray[600],
          borderTopWidth: 0,
          paddingBottom: sizes[6],
          paddingTop: sizes[6],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeIcon
              fill={color}
              height={iconSize}
              width={iconSize}
              testID="home-icon"
            />
          ),
        }}
      />
      <Screen
        name="history"
        component={History}
        options={{
          tabBarIcon: ({ color }) => (
            <HistoryIcon
              fill={color}
              height={iconSize}
              width={iconSize}
              testID="history-icon"
            />
          ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <ProfileIcon
              fill={color}
              height={iconSize}
              width={iconSize}
              testID="profile-icon"
            />
          ),
        }}
      />
      <Screen
        name="exercise"
        component={Exercise}
        options={{ tabBarButton: () => null }}
      />
    </Navigator>
  )
}
