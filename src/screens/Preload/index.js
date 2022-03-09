import React, {useEffect} from 'react'
import { View, Text , SafeAreaView, StyleSheet, ActivityIndicator} from 'react-native'
import BarberLogo from '../../assets/BarberLogo.svg'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useNavigation} from '@react-navigation/native'

export default function Preload() {

  const navigation = useNavigation()

  useEffect(()=>{
      const checkToken = async () => {
          const token = await AsyncStorage.getItem('token')
          if(token !== null){
            //Validar o token
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
 