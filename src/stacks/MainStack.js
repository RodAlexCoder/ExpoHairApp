import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Preload from '../screens/Preload'
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import Barber from '../screens/Barber'
import MainTab from './MainTab'

const Stack = createNativeStackNavigator() 


export default function MainStack(){
    return(
        <Stack.Navigator
            initialRouteName='PreLoad'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='PreLoad' component={Preload}/>
            <Stack.Screen name='SignIn' component={SignIn}/>
            <Stack.Screen name='SignUp' component={SignUp}/>
            <Stack.Screen name='MainTab' component={MainTab}/>
            <Stack.Screen name='Barber' component={Barber}/>


        </Stack.Navigator>
    )
}