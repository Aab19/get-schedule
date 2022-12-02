import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import DetailSchedule from '../screens/DetailSchedule'
import Home from '../screens/Home'
import Login from '../screens/Login'
import {theme} from '../utils/styles'

const Stack = createNativeStackNavigator()

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Login" headerShown={false}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          statusBarColor: theme.backgroundScreen,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          statusBarColor: theme.statusBarColor,
        }}
      />
      <Stack.Screen
        name="Detail Schedule"
        component={DetailSchedule}
        options={{
          headerShown: false,
          statusBarColor: theme.statusBarColor,
        }}
      />
    </Stack.Navigator>
  )
}

export default Router
