import React from 'react'
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';

import ScreenRoutes from './src/Routes'; //Stack screen
import { toastConfig } from './toastConfig';
import { store } from './src/Redux/Store/store';
import { initializeLogger } from './src/Utils/Helper/logger';

enableScreens();
initializeLogger();

const App = () => {
  return (
    <AutocompleteDropdownContextProvider>
      <SafeAreaProvider>
        <Provider store={store}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <ScreenRoutes />
            <Toast config={toastConfig} />
          </GestureHandlerRootView>
        </Provider>
      </SafeAreaProvider>
    </AutocompleteDropdownContextProvider>
  )
}

export default App
