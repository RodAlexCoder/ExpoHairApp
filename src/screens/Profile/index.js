import React from 'react'
import {View, Text, Button, SafeAreaView} from 'react-native'
import api from '../../api'
import {useNavigation} from '@react-navigation/native'

export default function Profile() {
  const navigation = useNavigation()

  const handleLogOut = async () => {
    await api.logout()
    navigation.reset({
      routes: [{name: 'SignIn'}]
    })
  }

  return (
    <SafeAreaView>
        <Text>Tela Profile</Text>
        <Button title="Log Out" onPress={handleLogOut}/>
    </SafeAreaView>
  )
}
