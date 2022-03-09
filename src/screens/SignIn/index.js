import React , {useState, useContext}from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {UserContext} from '../../contexts/UserContext'

import BarberLogo from '../../assets/BarberLogo.svg'
import SignInput from '../../components/SignInput'
import EmailIcon from '../../assets/email.svg'
import LockIcon from '../../assets/lock.svg'
import api from '../../api'


export default function SignIn() {
  const {dispatch: UserDispatch} =useContext(UserContext)

  const navigation = useNavigation()

  const [emailField, setEmailField] = useState('')
  const [passwordField, setPasswordField] = useState('')


  const handleMessageButtonClick = () => {
    //Não deixa o usuario voltar para a tela, sem efetuar o login
      navigation.reset({
        routes: [{name: 'SignUp'}]
      })
  }

  const handleSignClick = async () => {
      if(emailField !== '' && passwordField !== '') {

        let json = await api.signIn(emailField, passwordField)
        console.log(json)

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

        } else {
          alert('Email ou senha errados!')
        }

      } else {
        alert('Preencha os campos corretamente')
      }
  }


  return (
    <SafeAreaView style={styles.container}>
      <BarberLogo width='100%' height='160' />

      <View style={styles.inputArea}>

          <View style={styles.InputArea}>
          <EmailIcon width='24' height='24' fill='#268596'/>
            <TextInput 
            placeholder='Digite seu email'
            value={emailField}
            onChangeText={text => setEmailField(text)}
            style={styles.textInput} 
            />
          </View>
            

      <View style={styles.InputArea}>
        <LockIcon width='24' height='24' fill='#268596'/>
       <TextInput 
        placeholder='Digite sua senha'
        value={passwordField}
        onChangeText={text => setPasswordField(text)}
        style={styles.textInput} 
        secureTextEntry={true}
        />
      </View>
       
        

          <TouchableOpacity style={styles.customButton} onPress={handleSignClick}>
            <Text style={styles.customButtonText}>LOGIN</Text>
          </TouchableOpacity>

      </View>

    <TouchableOpacity style={styles.SignMessageButton} onPress={handleMessageButtonClick}>
        <Text style={styles.SignMessageButtonText}>Ainda não possui uma conta?</Text>
        <Text style={styles.SignMessageButtonTextBold}>Cadastre-se</Text>
    </TouchableOpacity>
   


    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#63c2d1',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  inputArea:{
    padding: 40,
    width: '100%'
  },

  customButton: {
    height: 60,
    backgroundColor: '#268596',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },

  customButtonText: {
    fontSize: 18,
    color: '#FFF'
  },

  SignMessageButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 20
  },

  SignMessageButtonText: {
    fontSize: 16,
    color: '#268596'
  },

  SignMessageButtonTextBold: {
    fontSize: 16,
    color: '#268596',
    fontWeight: 'bold',
    marginLeft: 5
  },
  InputArea: {
    width: '100%',
    height: 60,
    backgroundColor: '#83d6e3',
    flexDirection: 'row',
    borderRadius: 30,
    paddingHorizontal: '10',
    alignItems: 'center',
    marginBottom: 15,
    paddingLeft: 15

},

textInput: {
    flex: 1,
    fontSize: 16,
    color: '#268596',
    marginLeft: 10
}
})
