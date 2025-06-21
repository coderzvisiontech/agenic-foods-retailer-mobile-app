import React from 'react'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import ScreenRoutes from './src/Routes'; //Stack screen
import { toastConfig } from './toastConfig';

enableScreens();

const App = () => {
  return (
    <AutocompleteDropdownContextProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ScreenRoutes />
          <Toast config={toastConfig} />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </AutocompleteDropdownContextProvider>
  )
}

export default App
