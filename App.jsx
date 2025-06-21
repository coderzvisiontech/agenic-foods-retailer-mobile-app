import React from 'react'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ScreenRoutes from './src/Routes'; //Stack screen

enableScreens();

const App = () => {
  return (
    <AutocompleteDropdownContextProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ScreenRoutes />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </AutocompleteDropdownContextProvider>
  )
}

export default App
