import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/stacks/MainStack';
import UserContextProvider from './src/contexts/UserContext';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs()


function App() {
  return (
    <UserContextProvider>
       <NavigationContainer>
           <MainStack />
       </NavigationContainer>
    </UserContextProvider>

  );
}

export default App;