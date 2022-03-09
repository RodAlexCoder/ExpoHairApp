import React, {useEffect, useContext} from 'react'
import { View, Text , SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native'
import BarberLogo from '../../assets/BarberLogo.svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useNavigation} from '@react-navigation/native'
import api from '../../api'
import {UserContext} from '../../contexts/UserContext'

export default function Preload() {
  const {dispatch: UserDispatch} =useContext(UserContext)
  const navigation = useNavigation()

  useEffect(()=>{
      const checkToken = async () => {
          const token = await AsyncStorage.getItem('token')
          if(token !== null){
            let json = await api.checkToken(token)
            if(json.token){

          await AsyncStorage.setItem('token', json.token)

          UserDispatch({
            type: 'setAvatar',
            payload: {
              avatar: json.data.avatar
            }
          })

          navigation.reset({
            routes: [{ name: 'MainTab'}]
          })

            } else{
              navigation.navigate('SignIn')
            }

          }else{
            //Mandar pro login
            navigation.navigate('SignIn')
          }
      }

      checkToken()
  },[])

  return (
    <SafeAreaView style={styles.container}>
        <BarberLogo width='100%' height='160'/>
        <ActivityIndicator  style={styles.loading} size='large' color='#FFF'/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
      backgroundColor: '#63c2d1',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  }, 
  loading: {
    marginTop: 50
  }
})
 