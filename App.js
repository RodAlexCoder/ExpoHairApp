import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainStack from './src/stacks/MainStack';

function App() {
  return (
    <NavigationContainer>
        <MainStack />
    </NavigationContainer>
  );
}

export default App;