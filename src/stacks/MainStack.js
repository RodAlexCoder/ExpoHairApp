import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Preload from '../screens/Preload'

const Stack = createNativeStackNavigator() 


export default function MainStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='PreLoad' component={Preload}/>
        </Stack.Navigator>
    )
}