/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {LogBox} from 'react-native'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import Router from './router'
import Store from './store/store'

const App = () => {
  LogBox.ignoreAllLogs()
  const {store, persister} = Store()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
